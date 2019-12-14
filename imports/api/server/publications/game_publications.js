import { Meteor } from "meteor/meteor";
import { Games } from "../../shared/models/games";

Meteor.publish("getTopTen", function() {
	return Games.find(
		{},
		{ fields: { username: 1, score: 1 }, sort: { score: -1 }, limit: 10 }
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
	if (!Meteor.userId()) return this.ready();

	return Games.find(
		{
			userId: Meteor.userId()
		},
		{ sort: { score: -1 }, limit: 1 }
	);
});
