import SimpleSchema from "simpl-schema";

export const Users = {};

Users.schema = new SimpleSchema({});

Users.createNewUser = (option, callback) => {
	const user = Meteor.users.findOne({ _id: Meteor.userId() });
	if (user) return;

	const { username, password } = option;
	return Accounts.createUser({ username, password });
};

Users.publishedFields = {
	services: 0
};

Meteor.users.deny({ update: () => true });

// Meteor.users.attachSchema(Users.schema);
