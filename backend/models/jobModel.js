import mongoose from "mongoose";



const jobSchema = new mongoose.Schema({
	position: {type: String, required: true},
    salary: {type: Number, required: true},
    city: {type: String, required: true},
    description: {type: String, required: true},
    userId: {type: mongoose.Types.ObjectId, ref: "User"}
},
{
    timestamps: {
        createdAt: 'created_at'
    }
}
);

const Job = mongoose.model("Job", jobSchema);

export default Job;