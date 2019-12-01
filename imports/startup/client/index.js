import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
import App from "../../ui/App";
import "./app_routes";

if (Meteor.isClient) {
	Meteor.startup(() => {
		render(<App />, document.getElementById("react-root"));
	});
}
