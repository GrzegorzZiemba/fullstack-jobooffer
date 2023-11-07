import mongoose from "mongoose";

export function createMongoDb(){
    mongoose
    .connect(process.env.MONGO_URI)
    .then((result) => {
      console.log("Connected");
    })
    .catch((err) => console.log(err));
};