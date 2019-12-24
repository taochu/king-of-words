import _ from "lodash";

const defaultState = {
	latestScore: 0
};

const appReducer = (state = defaultState, action) => {
	const newState = _.cloneDeep(state);

	switch (action.type) {
		case "SAVE_LATEST":
			newState.latestScore = action.score;
			break;
		default:
			break;
	}
	return newState;
};

export default appReducer;
