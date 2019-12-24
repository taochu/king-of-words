import { Meteor } from "meteor/meteor";
import { Users } from "../../shared/models/users";
import { Games } from "../../shared/models/games";

Meteor.publish("currentUser", function() {
	if (!this.userId) {
		return this.ready();
	}
	return Meteor.users.find(
		{ _id: this.userId },
		{ fields: Users.publishedFields }
	);
});

Meteor.publish("numGameUserPlayed", function() {
	return new Counter("numGameUserPlayed", Games.find({}));
});
