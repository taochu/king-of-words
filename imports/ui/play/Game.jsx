import React from "react";
import CharButton from "../components/CharButton";
import _ from "lodash";
import { GameMethods } from "../../api/shared/methods/game_methods";
import ASSET_URLS from "../asset_urls";
import ActionButton from "../components/ActionButton";

class Game extends React.Component {
	state = { letters: [], selected: [], score: 0, seconds: 10, words: [] };

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	componentDidMount() {
		const letters = [];
		this.interval = setInterval(() => {
			this.setState({ seconds: this.state.seconds - 1 });
		}, 1000);
		for (const i in _.range(100)) {
			letters.push(this.getRandomChar());
		}
		this.setState({ letters });
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.seconds === 1 && this.state.seconds === 0) {
			const { score, words } = this.state;
			this.props.actions.saveLatest(score);
			GameMethods.saveGame.call({ score, words }, (err, res) => {
				if (err) alert(err);
				FlowRouter.go("/result");
			});
		}
	}

	getRandomChar() {
		const alphabets = "abcdefghijklmnopqrstuvwxyz";
		return alphabets[Math.floor(Math.random() * 25)];
	}

	onEnter = word => {
		const { selected, letters, score, words } = this.state;
		GameMethods.validateInput.call({ word }, (err, res) => {
			if (err) alert(err);
			if (res) {
				selected.forEach(({ index }) => {
					letters[index] = this.getRandomChar();
				});
				words.push(word);
				this.setState({ score: score + word.length, letters, selected: [] });
			}
		});
	};

	onBackspace = () => {
		const { selected } = this.state;
		selected.pop();
		this.setState({ selected });
	};

	onClear = () => {
		this.setState({ selected: [] });
	};

	renderGameButtons() {
		const { letters, selected } = this.state;
		return (
			<div className="game-grid">
				{letters.map((letter, index) => {
					return (
						<CharButton
							key={index}
							letter={letter}
							onClick={() =>
								this.setState(prevState => {
									const { selected } = prevState;
									const existed = _.find(
										selected,
										({ index: existedIndex }) => existedIndex === index
									);
									existed
										? _.pull(selected, existed)
										: selected.push({ letter, index });
									return selected;
								})
							}
							selected={_.some(
								selected,
								({ index: selectedIndex }) => index === selectedIndex
							)}
						/>
					);
				})}
			</div>
		);
	}

	render() {
		const { selected, score, seconds } = this.state;
		const word = _.map(selected, ({ letter }) => letter).join("");

		return (
			<div className="game-page space-20">
				<div style={{ width: "600px", margin: "0 auto" }}>
					{this.renderGameButtons()}
					<div className="bottom flex-row">
						<div className="col-sm-3 counter">{seconds}</div>
						<div className="col-sm-9">
							<div className="selected-chars">{word}</div>
							<div
								className="flex horizontal space-10"
								style={{ textAlign: "right" }}
							>
								<ActionButton type="check" onClick={() => this.onEnter(word)} />
								<ActionButton type="backspace" onClick={this.onBackspace} />
								<ActionButton type="clear" onClick={this.onClear} />
								<h2 className="score">SCORE: {score}</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Game;
