import express from 'express'
import Job from '../models/jobModel.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.post('/', auth, async(req,res) => {
    try {
        console.log("ok")
    } catch (error) {
        console.log('notok')
    }
})