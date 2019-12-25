import React from "react";
import CharButton from "../components/CharButton";
import _ from "lodash";
import { GameMethods } from "../../api/shared/methods/game_methods";
import ASSET_URLS from "../asset_urls";
import ActionButton from "../components/ActionButton";

class Game extends React.Component {
	state = {
		letters: [],
		selected: [],
		score: 0,
		seconds: 10,
		words: [],
		hovering: 45
	};

	componentWillMount() {
		document.addEventListener("keydown", this.onKeyDown.bind(this));
	}

	componentWillUnmount() {
		// clearInterval(this.interval);
		document.removeEventListener("keydown", this.onKeyDown.bind(this));
	}

	onKeyDown(e) {
		// 13: enter, 32: space, 8: backspace, 9: tab
		// 37: left, 38: up, 39: right, 40: down
		e.preventDefault();
		const { selected, hovering, letters } = this.state;
		const key = e.keyCode;
		const word = _.map(selected, ({ letter }) => letter).join("");

		switch (key) {
			case 13:
				this.onEnter(word);
				break;
			case 32:
				const letter = letters[hovering];
				this.onSelect(letter, hovering);
				break;
			case 8:
				this.onBackspace();
				break;
			case 9:
				this.onClear();
				break;
			case 37:
				this.setState({ hovering: hovering - 1 });
				break;
			case 38:
				if (hovering >= 10) {
					this.setState({ hovering: hovering - 10 });
				}
				break;
			case 39:
				this.setState({ hovering: hovering + 1 });
				break;
			case 40:
				if (hovering <= 89) {
					this.setState({ hovering: hovering + 10 });
				}
				break;
		}
	}

	componentDidMount() {
		const letters = [];
		// this.interval = setInterval(() => {
		// 	this.setState({ seconds: this.state.seconds - 1 });
		// }, 1000);
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

	onSelect(letter, index) {
		this.setState(prevState => {
			const { selected } = prevState;
			const existed = _.find(
				selected,
				({ index: existedIndex }) => existedIndex === index
			);
			existed ? _.pull(selected, existed) : selected.push({ letter, index });
			return selected;
		});
	}

	renderGameButtons() {
		const { letters, selected, hovering } = this.state;

		return (
			<div className="game-grid">
				{letters.map((letter, index) => {
					return (
						<CharButton
							key={index}
							letter={letter}
							hovered={index == hovering}
							onClick={() =>
								// this.setState(prevState => {
								// 	const { selected } = prevState;
								// 	const existed = _.find(
								// 		selected,
								// 		({ index: existedIndex }) => existedIndex === index
								// 	);
								// 	existed
								// 		? _.pull(selected, existed)
								// 		: selected.push({ letter, index });
								// 	return selected;
								// })
								this.onSelect(letter, index)
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
