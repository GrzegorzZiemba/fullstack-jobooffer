import express from "express";
import User from "../models/userModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/createuser", async (req, res) => {
  try {
    const checkEmail = await User.find({ email: req.body.email });
    console.log(checkEmail);
    if (checkEmail.length < 1) {
      const user = req.body;
      console.log(user);
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

router.get("/userinfo", auth, async (req, res) => {
  console.log(req.user + " //// ");
  res.send({
    username: req.user.username,
    email: req.user.email,
    isRecruiter: req.user.isRecruiter,
  });
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

router.post("/updateuser", auth, async (req, res) => {
  if (auth) {
    try {
      console.log(req.body);

      if (req.user._id == req.body.userInfo.user) {
        await User.findByIdAndUpdate(
          {
            _id: req.user._id,
          },
          {
            username: req.body.username,
            isRecruiter: req.body.isRecruiter,
          }
        );
        console.log("Hello");
      }
    } catch (error) {
      console.log("hello");
    }
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
