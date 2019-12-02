import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import App from "./App";

const AppContainer = withTracker(props => {
	const { content } = props;
	const userReady = Meteor.subscribe("currentUser").ready();
	const user = Meteor.users.findOne({ _id: Meteor.userId() });
	return { content, ready: userReady, user };
})(App);

export default AppContainer;
