import React from "react";

const Button = (props) => {
	const style = {
		height: "30px",
		border: "white 1.5px solid",
		color: "white",
		background: "#333a3f",
		borderRadius: "30px",
		padding: "0 10px",
		lineHeight: "30px",
		marginRight: "10px",
		fontSize: "16px",
		fontWeight: "bold",
	};
	return (
		<>
			<button style={style}>{props.children}</button>
		</>
	);
};

export default Button;
