import express  from "express";
import cors from 'cors'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { createMongoDb } from "./db/mongodb.js";


dotenv.config()


const app = express()

app.use
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
createMongoDb()


const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`I'm on port ${PORT}`)
})