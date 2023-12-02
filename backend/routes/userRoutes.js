import express from "express";
import User from "../models/userModel.js";
import auth from "../middleware/auth.js";
import Job from "../models/jobModel.js";
const router = express.Router();

router.post("/createuser", async (req, res) => {
  try {
    const checkEmail = await User.find({ email: req.body.email });
    if (checkEmail.length < 1) {
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

router.get("/userinfo", auth, async (req, res) => {
  res.send({
    username: req.user.username,
    email: req.user.email,
    isRecruiter: req.user.isRecruiter,
    applied: req.user.applied,
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
      }
    } catch (error) {
      res.status(400).send({ error: "Cannot update" });
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

router.post("/apply", auth, async (req, res) => {
  try {
    const jobId = req.body.jobId;
    const userId = req.body.userId;

    const user = await User.findById(userId);
    const job = await Job.findById(jobId);

    if (!user.applied.includes(jobId) && !job.applied.includes(userId)) {
      user.applied.push(jobId);
      job.applied.push(userId);
      await user.save();
      await job.save();

      res.send({ data: "done" });
    } else {
      res.status(400).send({ error: "Cannot Apply" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: "Cannot Apply" });
  }
});

export default router;
