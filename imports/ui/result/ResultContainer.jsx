import React from "react";
import { Meteor } from "meteor/meteor";
import { Counter } from "meteor/natestrauser:publish-performant-counts";
import { withTracker } from "meteor/react-meteor-data";
import Result from "./Result";
import { Games } from "../../api/shared/models/games";

export default ResultContainer = withTracker(props => {
	Meteor.subscribe("getTopTen");
	const topTen = Games.find(
		{},
		{ fields: { score: 1 } },
		{ sort: { score: -1 }, limit: 10 }
	).fetch();
	// Get Rank
	Meteor.subscribe("getRank", props.latestScore);
	const rank = Counter.get("getRank");
	// Get User Best Score
	Meteor.subscribe("getUserBest");
	const userBest = Games.find(
		{
			userId: Meteor.userId()
		},
		{ sort: { score: -1 }, limit: 1 }
	).fetch();

	return { topTen, rank, userBest };
})(Result);
