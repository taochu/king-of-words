import React from "react";
import classnames from "classnames";

const Button = ({ children, onClick, className }) => {
	const cn = classnames("button", className);
	return (
		<button className={cn} onClick={onClick}>
			{children}
		</button>
	);
};

export default Button;
