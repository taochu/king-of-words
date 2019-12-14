import React from "react";

class Result extends React.Component {
	render() {
		const { topTen, rank, userBest, latestScore } = this.props;

		return (
			<div>
				Your Score: {latestScore}
				{topTen.map(({ username, score }) => (
					<div>
						{username}: {score}
					</div>
				))}
				<div>Rank: {rank}</div>
				{userBest && <div>Your Best: {userBest.score}</div>}
			</div>
		);
	}
}

export default Result;
