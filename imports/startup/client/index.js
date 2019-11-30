import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
import Home from "../../ui/Home.jsx";

if (Meteor.isClient) {
	Meteor.startup(() => {
		render(<Home />, document.getElementById("react-root"));
	});
}
