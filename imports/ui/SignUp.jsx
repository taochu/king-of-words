import React from "react";
import { Accounts } from "meteor/accounts-base";
import { Users } from "../api/shared/models/users";

class SignUp extends React.Component {
	state = {
		username: "",
		password: "",
		confirmPassword: ""
	};

	render() {
		const { username, password, confirmPassword } = this.state;

		return (
			<div className="sign-up-page">
				<h1>Sign Up</h1>
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
					<input
						type="text"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={e => this.setState({ confirmPassword: e.target.value })}
					/>
					<button onClick={() => Users.createNewUser({ username, password })}>
						Sign Up
					</button>
				</div>
			</div>
		);
	}
}

export default SignUp;
