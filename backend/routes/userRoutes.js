import express from "express";
import User from "../models/userModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/createuser", async (req, res) => {
  try {
    const user = req.body;
    const createUser = new User({
      ...user,
    });
    await createUser.save();
    const token = await createUser.generateAuthToken();
    res.send({ token });
  } catch (error) {
    console.error(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.loginUser(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 580000000,
    });
    res.send({ user: user._id });
  } catch (e) {
    res.status(400).send({ error: "Cannot login" });
  }
});

router.post("/logout", auth, async (req, res) => {
  if (auth) {
    try {
      res.cookie("jwt", "", {
        httpOnly: true,
      });
      res.status(200).send({ text: "Logged Out" });
    } catch (e) {
      res.status(400).send({ error: "Cannot logout" });
    }
  } else {
    console.error(error);
  }
});

export default router;
