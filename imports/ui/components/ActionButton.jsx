import React from "react";
import ASSET_URLS from "../asset_urls";

const ActionButton = ({ type, onClick }) => {
	let icon;
	switch (type) {
		case "backspace":
			icon = ASSET_URLS.backspace;
			break;
		case "check":
			icon = ASSET_URLS.check;
			break;
		case "clear":
			icon = ASSET_URLS.clear;
			break;
	}

	return (
		<button className={`btn action-btn ${type}`} onClick={onClick}>
			<img src={icon} />
		</button>
	);
};

export default ActionButton;
