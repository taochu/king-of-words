import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import checkWord from "check-word";

export const GameMethods = {};

const DICT = checkWord("en");

GameMethods.validateInput = new ValidatedMethod({
	name: "GameMethods.validateInput",
	validate: new SimpleSchema({
		word: { type: String }
	}).validator(),
	run({ word }) {
		if (!Meteor.isServer) return;
		return DICT.check(word) && word.length >= 2;
	}
});
