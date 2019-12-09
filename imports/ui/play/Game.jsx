import React from "react";
import WordButton from "../components/WordButton";

class Game extends React.Component {
	state = { letters: [] };
	componentDidMount() {
		// Generate Game Board (fill letters with 80 letters)
	}
	renderGameButtons() {
		const { letters } = this.state;
	}
	render() {
		return (
			<div>
				<WordButton letter="k" />
			</div>
		);
	}
}

export default Game;
