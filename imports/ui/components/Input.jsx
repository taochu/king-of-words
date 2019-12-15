import React from "react";

const Input = ({ placeholder, value, onChange, password }) => {
	return (
		<input
			type={password ? "password" : "text"}
			className="input"
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	);
};

export default Input;
