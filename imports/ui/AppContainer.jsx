import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import App from "./App";
import { connect, Provider } from "react-redux";
import { createStore } from "redux";
import { compose } from "recompose";
import appReducer from "./app_reducer";
import _ from "lodash";
import { Games } from "../api/shared/models/games";

const mapStateToProps = state => ({
	...state
});

const mapDispatchToProps = dispatch => ({
	actions: {
		saveLatest: score => dispatch({ type: "SAVE_LATEST", score })
	}
});

const dataTracker = withTracker(props => {
	const { content } = props;
	const userHandleReady = Meteor.subscribe("currentUser").ready();
	const user = Meteor.users.findOne({ _id: Meteor.userId() });

	Meteor.subscribe("getUserBest");
	Meteor.subscribe("numGameUserPlayed");

	const userBest = Meteor.userId()
		? _.head(
				Games.find(
					{
						userId: Meteor.userId()
					},
					{ sort: { score: -1 }, limit: 1 }
				).fetch()
		  )
		: null;
	const numGameUserPlayed = Counter.get("numGameUserPlayed");

	return { content, userHandleReady, user, userBest, numGameUserPlayed };
});

const ComposedApp = compose(
	connect(mapStateToProps, mapDispatchToProps),
	dataTracker
)(App);

class AppContainer extends React.Component {
	constructor(props) {
		super(props);
		this.store = createStore(appReducer);
	}

	render() {
		return (
			<Provider store={this.store}>
				<ComposedApp {...this.props} />
			</Provider>
		);
	}
}

export default AppContainer;
