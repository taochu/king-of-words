import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import { Users } from "../models/users";

export const UserMethods = {};

UserMethods.addUser = new ValidatedMethod({
	name: "UserMethods.addUser",
	validate: new SimpleSchema({
		option: { type: Object, blackbox: true }
	}).validator(),
	run({ option }) {
		if (!Meteor.isServer) return;

		const { username, password } = option;
		const user = Meteor.users.findOne({ username });
		if (user)
			throw new Meteor.Error(
				"This username exists, please log in or sign up with another username"
			);

		return Accounts.createUser({ username, password });
	}
});
