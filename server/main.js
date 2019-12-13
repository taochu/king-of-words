import { Meteor } from "meteor/meteor";
import "../imports/api/server/publications/account_publications";
import "../imports/api/shared/methods/user_methods";
import "../imports/api/shared/methods/game_methods";

Meteor.startup(() => {
	// code to run on server at startup
});
