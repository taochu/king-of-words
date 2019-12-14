import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import Play from "./Play";

export default PlayContainer = withTracker(props => {
	const { content, actions } = props;
	const userReady = Meteor.subscribe("currentUser").ready();
	const user = Meteor.users.findOne({ _id: Meteor.userId() });
	return { content, ready: userReady, user, actions };
})(Play);
