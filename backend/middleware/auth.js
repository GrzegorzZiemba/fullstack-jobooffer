import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  let token;

  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;
  console.log(token);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_JWT);
      console.log(decoded);
      req.user = await User.findById(decoded._id);
      console.log(req.user);

      next();
    } catch (error) {
      res.status(401).send({ msg: "Wrong Token" });
    }
  } else {
    res.status(401).send({ msg: "No token!" });
  }
};

export default auth;
