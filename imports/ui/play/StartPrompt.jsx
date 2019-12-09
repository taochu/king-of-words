import React from "react";

class StartPrompt extends React.Component {
	render() {
		return (
			<div className="centered">
				<button onClick={() => this.props.onStartClick()}>START</button>
			</div>
		);
	}
}

export default StartPrompt;
