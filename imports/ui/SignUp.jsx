import React from "react";
import { UserMethods } from "../api/shared/methods/user_methods";
import Input from "./components/Input";
import Button from "./components/Button";

class SignUp extends React.Component {
	state = {
		username: "",
		password: "",
		confirmPassword: ""
	};

	render() {
		const { username, password, confirmPassword } = this.state;

		return (
			<div className="sign-up flex-column vertical space-20">
				<h1>SIGN UP</h1>
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
					<Input
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={e => this.setState({ confirmPassword: e.target.value })}
						password
					/>
				</div>
				<Button
					onClick={() =>
						UserMethods.addUser.call(
							{ option: { username, password } },
							(err, res) => {
								if (err) alert(err.error);
								else FlowRouter.go("/");
							}
						)
					}
				>
					Sign Up
				</Button>
				<Button onClick={() => FlowRouter.go("/")}>home</Button>
			</div>
		);
	}
}

export default SignUp;
