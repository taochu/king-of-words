import React from "react";
import _ from "lodash";
import Button from "./components/Button";
import ASSET_URLS from "./asset_urls";

class LoggedInHome extends React.Component {
	renderUserInfoCard() {
		const { user, userBest, numGameUserPlayed } = this.props;
		const bestScore = _.get(userBest, "score");
		const { username, totalScore } = user;

		return (
			<div className="user-info-card">
				<div className="grid-2 margin-bottom-20">
					<img src={ASSET_URLS.account} />
					<h1 className="username">{username}</h1>
				</div>
				<div className="grid-3">
					<div>
						<div className="secondary-text">BEST SCORE</div>
						{bestScore ? (
							<div className="big-font">{bestScore}</div>
						) : (
							<div className="margin-top-30">Haven't played any games yet</div>
						)}
					</div>
					<div>
						<div className="secondary-text">GAMES</div>
						<div className="big-font">{numGameUserPlayed}</div>
					</div>
					<div>
						<div className="secondary-text">AVG. SCORE</div>
						<div className="big-font">
							{numGameUserPlayed
								? _.round(totalScore / numGameUserPlayed, 1)
								: 0}
						</div>
					</div>
				</div>
			</div>
		);
	}
	render() {
		return (
			<div className="home flex-column vertical space-20">
				<h1 className="title">KING OF WORDS</h1>
				{this.renderUserInfoCard()}
				<Button onClick={() => FlowRouter.go("/play")}>Play</Button>
				<Button onClick={() => Meteor.logout()}>Log Out</Button>
			</div>
		);
	}
}

export default LoggedInHome;
