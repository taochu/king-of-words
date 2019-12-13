import React from "react";

class App extends React.Component {
	render() {
		const { content } = this.props;
		return <>{typeof content === "function" ? content(this.props) : content}</>;
	}
}

export default App;
