import express from "express";
import Job from "../models/jobModel.js";
import auth from "../middleware/auth.js";
import isRecruiter from "../middleware/isRecruiter.js";
const router = express.Router();

router.post("/createjob", auth, isRecruiter, async (req, res) => {
  try {
    const jobbody = req.body;
    if (auth) {
      const job = new Job({
        ...jobbody,
        userId: jobbody.userId,
      });
      job.save();

      res.send({ message: "DONE" });
    } else {
    }
  } catch (error) {}
});

router.post("/updatejob", auth, async (req, res) => {
  const { userId } = req.body;
  const { jobId } = req.body;

  const job = await Job.find({ _id: jobId });
  try {
    const jobbody = req.body;
    if (job[0].userId == userId) {
      await Job.findByIdAndUpdate({ _id: job[0]._id }, { ...jobbody });
      res.send({ data: "Done" });
    } else {
    }
  } catch (error) {}
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const { userId } = req.body;
    const { jobId } = req.body;
    const job = await Job.find({ _id: jobId });
    if (job[0].userId == userId) {
      await Job.findByIdAndDelete({ _id: jobId });
      res.send({ msg: "done" });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(404);
  }
});

router.get("/allposts", async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.send(jobs);
  } catch (error) {
    res.sendStatus(404);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.find({ _id: id });
    res.send(job);
  } catch (error) {
    res.sendStatus(404);
  }
});

export default router;
