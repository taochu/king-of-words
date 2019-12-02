import React from "react";

class App extends React.Component {
	render() {
		const { content } = this.props;
		return (
			<div>{typeof content === "function" ? content(this.props) : content}</div>
		);
	}
}

export default App;
