import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  console.log("EEE");
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT);

      req.user = await User.findById(decoded.userId);

      next();
    } catch (error) {
      console.error(error);
      res.status(401).send({ msg: "Wrong Token" });
    }
  } else {
    res.status(401).send({ msg: "No token!" });
  }
};

export default auth;
