import React from "react";
import classnames from "classnames";

class WordButton extends React.Component {
	render() {
		const { letter, onClick, selected } = this.props;
		const cn = classnames("game-btn", { selected });
		return (
			<button className={cn} onClick={() => onClick && onClick()}>
				{letter}
			</button>
		);
	}
}

export default WordButton;
