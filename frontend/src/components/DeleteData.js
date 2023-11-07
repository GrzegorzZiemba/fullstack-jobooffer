import React from "react";
import { Button } from "react-bootstrap";

const DeleteData = ({ id }) => {
	return (
		<>
			<Button
				style={{ background: "#BD7028 ", border: "none" }}
			>
				Delete
			</Button>{" "}
		</>
	);
};

export default DeleteData;
