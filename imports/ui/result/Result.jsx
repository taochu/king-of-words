import React from "react";

class Result extends React.Component {
	render() {
		const { topTen, rank, userBest, latestScore } = this.props;
		return <div>Your Score: {latestScore}</div>;
	}
}

export default Result;
