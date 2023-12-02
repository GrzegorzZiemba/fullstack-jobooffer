import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    image: { type: String },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    city: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    applied: [{ type: String }],
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
