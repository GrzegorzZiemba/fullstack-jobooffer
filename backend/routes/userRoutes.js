import express from "express";
import User from "../models/userModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/createuser", async (req, res) => {
  try {
    const checkEmail = await User.find({ email: req.body.email });
    if (checkEmail.length > 1) {
      const user = req.body;
      const createUser = new User({
        ...user,
      });
      await createUser.save();
      const token = await createUser.generateAuthToken();
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 580000000,
      });
      res.send({ user: createUser._id });
    } else {
      res.status(400).send({ error: "Cannot login" });
    }
  } catch (error) {
    res.status(400).send({ error: "Cannot login" });
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
    res.status(400).send({ error: "Cannot logout" });
  }
});

export default router;
