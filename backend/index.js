import express  from "express";
import cors from 'cors'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { createMongoDb } from "./db/mongodb.js";
import userRoutes from './routes/userRoutes.js'
import jobRoutes from './routes/jobRoutes.js'

dotenv.config()


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
createMongoDb()
app.use(userRoutes)
app.use(jobRoutes)


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`I'm on port ${PORT}`)
})