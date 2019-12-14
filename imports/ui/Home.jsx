import React from "react";

class Home extends React.Component {
	state = { username: "", password: "" };

	render() {
		const { username, password } = this.state;
		const { userHandleReady, user } = this.props;

		if (!userHandleReady) return <div>LOADING</div>;
		return (
			<div className="flex-column space-20">
				<h1>King of Words</h1>
				<div className="flex-column">
					<input
						type="text"
						placeholder="Username"
						value={username}
						onChange={e => this.setState({ username: e.target.value })}
					/>
					<input
						type="text"
						placeholder="Password"
						value={password}
						onChange={e => this.setState({ password: e.target.value })}
					/>
				</div>
				<button
					onClick={() => {
						user
							? Meteor.logout()
							: Meteor.loginWithPassword(username, password, (err, res) => {
									if (err) alert(err);
							  });
					}}
				>
					{user ? "Log out" : "Log in"}
				</button>
				<div className="flex-row">
					<div className="divider" />
					<div style={{ color: "#999", lineHeight: "15px", margin: "0 18px" }}>
						OR
					</div>
					<div className="divider" />
				</div>
				<button onClick={() => FlowRouter.go("/sign-up")}>Sign up</button>
				<button onClick={() => FlowRouter.go("/play")}>Play</button>
			</div>
		);
	}
}

export default Home;
