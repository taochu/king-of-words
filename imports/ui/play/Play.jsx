import React from "react";
import StartPrompt from "./StartPrompt";
import Game from "./Game";

class Play extends React.Component {
	state = { play: true };
	startPlay = () => this.setState({ play: true });

	render() {
		return this.state.play ? (
			<Game {...this.props} />
		) : (
			<StartPrompt onStartClick={this.startPlay} />
		);
	}
}

export default Play;
