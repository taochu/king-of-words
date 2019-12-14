import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import checkWord from "check-word";
import { Games } from "../models/games";

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

GameMethods.saveGame = new ValidatedMethod({
	name: "GameMethods.saveGame",
	validate: new SimpleSchema({
		score: { type: Number },
		words: { type: Array },
		"words.$": { type: String }
	}).validator(),
	run({ score, words }) {
		if (!Meteor.isServer) return;
		const { _id, username } = Meteor.user() || {};
		Games.insert({
			createdAt: new Date(),
			score,
			words,
			userId: _id,
			username
		});
	}
});
