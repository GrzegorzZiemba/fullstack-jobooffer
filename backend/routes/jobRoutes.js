import express from "express";
import Job from "../models/jobModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/createjob", auth, async (req, res) => {
  console.log("CREATE JOB");
  console.log(">>>>>");
  console.log(req.body);
  console.log("<<<<<");

  try {
    const jobbody = req.body;
    if (auth) {
      console.log(auth);
      const job = new Job({
        ...jobbody,
        userId: jobbody.userId,
      });
      job.save();

      console.log("ok");
      res.send({ message: "DONE" });
    } else {
      console.log("do not able to do");
    }
  } catch (error) {
    console.log(error);
    console.log("notok");
  }
});

router.post("/updatejob", auth, async (req, res) => {
  try {
    const jobbody = req.body;
    if (auth._id === jobbody.userId) {
      console.log("can");
    } else {
      console.log("cannot");
    }
  } catch (error) {
    console.log("error");
  }
});

router.delete("/delete", auth, async (req, res) => {
  const userId = req.body._id;
  try {
    if (auth._id === userId) {
      await Job.findByIdAndDelete({ _id: userId });
      console.log("Deleted");
    } else {
      console.log("cannot delete");
    }
  } catch (error) {
    console.log("ERROR");
  }
});

router.get("/allposts", async (req, res) => {
  try {
    const jobs = await Job.find({});
    console.log(jobs);
    res.send(jobs);
  } catch (error) {
    console.log(errors);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const job = await Job.find({ _id: id });
    console.log(job);
    res.send(job);
  } catch (error) {
    console.log("error");
  }
});

export default router;
