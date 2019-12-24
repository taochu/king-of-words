import { Meteor } from "meteor/meteor";
import { Games } from "../../shared/models/games";

Meteor.publish("getTopFive", function() {
	return Games.find(
		{},
		{ fields: { score: 1, username: 1 }, sort: { score: -1 }, limit: 5 }
	);
});

Meteor.publish("getRank", function(userScore) {
	return new Counter(
		"getRank",
		Games.find({
			score: { $gt: userScore }
		})
	);
});

Meteor.publish("getUserBest", function() {
	return Games.find(
		{
			userId: Meteor.userId()
		},
		{ sort: { score: -1 }, limit: 1 }
	);
});
