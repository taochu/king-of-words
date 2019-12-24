import React from "react";
import _ from "lodash";
import Button from "../components/Button";

class Result extends React.Component {
	renderResultRow() {
		const { user, rank, userBest, latestScore } = this.props;

		return (
			<div className="result-rows">
				<div className="result-col">
					<div className="secondary-text">RANK</div>
					<div className="big-font">{rank}</div>
				</div>
				<div className="result-col">
					<div className="secondary-text">SCORE</div>
					<div className="big-font">{latestScore}</div>
				</div>
				<div className="result-col">
					{user ? (
						<>
							<div className="secondary-text">YOUR BEST</div>
							<div className="big-font"> {_.get(userBest, "score")}</div>
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
		const { topFive } = this.props;

		return (
			<div className="centered">
				<div className="results flex-column">
					{this.renderResultRow()}
					<h3>ALL TIME TOP 5</h3>
					{topFive.map(({ username, score }, i) => (
						<div className="top-five-card" key={i}>
							<h3>{username}</h3>
							<h2>{score}</h2>
						</div>
					))}
					<Button
						className="margin-top-20"
						onClick={() => FlowRouter.go("/play")}
					>
						Play Again
					</Button>
					<Button className="margin-top-10" onClick={() => FlowRouter.go("/")}>
						Home
					</Button>
				</div>
			</div>
		);
	}
}

export default Result;
