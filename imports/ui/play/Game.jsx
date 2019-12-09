import React from "react";
import WordButton from "../components/WordButton";
import _ from "lodash";

class Game extends React.Component {
	state = { letters: [], input: "" };

	componentDidMount() {
		const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const letters = [];
		for (const i in _.range(100)) {
			letters.push(alphabets[Math.floor(Math.random() * 25)]);
		}
		this.setState({ letters });
	}
	renderGameButtons() {
		const { letters } = this.state;
		return (
			<div className="game-grid">
				{letters.map((letter, i) => {
					return <WordButton key={i} letter={letter} />;
				})}
			</div>
		);
	}
	render() {
		return (
			<div style={{ textAlign: "center" }}>
				<div style={{ display: "inline-block" }}>
					{this.renderGameButtons()}
				</div>
			</div>
		);
	}
}

export default Game;
