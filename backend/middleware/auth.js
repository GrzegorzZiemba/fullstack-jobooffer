import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
	try {
		
		const token = req.header("Authorization").replace("Bearer", "");
		
		const tokenToVerify = JSON.parse(token);
		

		const decoded = jwt.verify(tokenToVerify, process.env.SECRET_JWT);
		
		const user = await User.findOne({
			_id: decoded._id,
			token: token,
		});

		if (!user) {
			throw new Error();
		}
		
		req.token = token;
		req.user = user;
		next();
	} catch (e) {
		res.send({ error: "PLease Authentiace" });
	}
};

export default auth;
