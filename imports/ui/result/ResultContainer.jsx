import React from "react";
import _ from "lodash";
import { Meteor } from "meteor/meteor";
import { Counter } from "meteor/natestrauser:publish-performant-counts";
import { withTracker } from "meteor/react-meteor-data";
import Result from "./Result";
import { Games } from "../../api/shared/models/games";

export default ResultContainer = withTracker(props => {
	Meteor.subscribe("getTopTen");
	Meteor.subscribe("getUserBest");
	Meteor.subscribe("getRank", props.latestScore);
	console.log(props.latestScore);

	const topTen = Games.find(
		{},
		{ fields: { score: 1, username: 1 } },
		{ sort: { score: -1 }, limit: 10 }
	).fetch();

	const rank = Counter.get("getRank") + 1;

	const userBest = _.head(
		Games.find(
			{
				userId: Meteor.userId()
			},
			{ sort: { score: -1 }, limit: 1 }
		).fetch()
	);

	return { topTen, rank, userBest };
})(Result);
