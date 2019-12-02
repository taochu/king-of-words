import { Meteor } from "meteor/meteor";
import { Users } from "../../shared/models/users";

Meteor.publish("currentUser", function() {
	if (!this.userId) {
		return this.ready();
	}
	return Meteor.users.find(
		{ _id: this.userId },
		{ fields: Users.publishedFields }
	);
});
