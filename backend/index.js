import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import { createMongoDb } from "./db/mongodb.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
createMongoDb();
const corsOptions = {
  // set origin to a specific origin.
  origin: "http://localhost:3000",

  // or, set origin to true to reflect the request origin
  //origin: true,

  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.use(userRoutes);
app.use(jobRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`I'm on port ${PORT}`);
});
