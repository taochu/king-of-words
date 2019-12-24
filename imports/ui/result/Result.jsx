import React from "react";

class Result extends React.Component {
	renderResultRow() {
		const { rank, userBest, latestScore } = this.props;

		return (
			<div className="result-rows">
				<div className="result-col">
					<div className="secondary-text">RANK</div>
					<div className="big-result">{rank}</div>
				</div>
				<div className="result-col">
					<div className="secondary-text">SCORE</div>
					<div className="big-result">{latestScore}</div>
				</div>
				<div className="result-col">
					{userBest ? (
						<>
							<div className="secondary-text">YOUR BEST</div>
							<div className="big-result"> {userBest.score}</div>
						</>
					) : (
						<>
							<div className="secondary-text">YOUR BEST</div>
							<div className="sign-in-prompt">
								<a href="/">Sign in</a>
							</div>
						</>
					)}
				</div>
			</div>
		);
	}
	render() {
		const { topTen } = this.props;

		return (
			<div className="centered">
				<div className="results flex-column">
					{this.renderResultRow()}
					<h3>ALL TIME TOP 10</h3>
					{topTen.map(({ username, score }) => (
						<div className="top-ten-card">
							<h3>{username}</h3>
							<h2>{score}</h2>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default Result;
