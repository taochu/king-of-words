import SimpleSchema from "simpl-schema";

export const Users = {};

Users.schema = new SimpleSchema({});

Users.publishedFields = {
	services: 0
};

Meteor.users.deny({ update: () => true });

// Meteor.users.attachSchema(Users.schema);
