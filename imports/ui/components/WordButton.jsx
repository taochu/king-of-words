import React from "react";
import classnames from "classnames";

class WordButton extends React.Component {
	state = { selected: false };

	render() {
		const { letter, onClick } = this.props;
		const { selected } = this.state;
		const cn = classnames("game-btn", { selected });
		return (
			<button
				className={cn}
				onClick={() => {
					onClick && onClick();
					this.setState({ selected: !selected });
				}}
			>
				{letter}
			</button>
		);
	}
}

export default WordButton;
