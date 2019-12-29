import React from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import LoggedInHome from "./LoggedInHome";

class Home extends React.Component {
	state = { username: "", password: "" };

	render() {
		const { username, password } = this.state;
		const { userHandleReady, user } = this.props;

		if (!userHandleReady) return <div>LOADING</div>;
		if (user) {
			return <LoggedInHome {...this.props} />;
		}

		return (
			<div className="home flex-column vertical space-20">
				<h1 className="title">KING OF WORDS</h1>
				<div className="flex-column vertical space-10">
					<Input
						placeholder="Username"
						value={username}
						onChange={e => this.setState({ username: e.target.value })}
					/>
					<Input
						placeholder="Password"
						value={password}
						onChange={e => this.setState({ password: e.target.value })}
						password
					/>
				</div>
				<Button
					onClick={() =>
						Meteor.loginWithPassword(username, password, (err, res) => {
							if (err) alert(err);
						})
					}
				>
					Log in
				</Button>
				<div className="flex-row">
					<div className="divider" />
					<div style={{ color: "#999", lineHeight: "15px", margin: "0 18px" }}>
						OR
					</div>
					<div className="divider" />
				</div>
				<Button onClick={() => FlowRouter.go("/sign-up")}>Sign up</Button>
				<Button onClick={() => FlowRouter.go("/play")}>Play</Button>
			</div>
		);
	}
}

export default Home;
