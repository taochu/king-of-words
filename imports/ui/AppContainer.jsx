import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import App from "./App";

const AppContainer = withTracker(({ content }) => {
	return {
		content
	};
})(App);

export default AppContainer;
