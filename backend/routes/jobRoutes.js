import express from 'express'
import Job from '../models/jobModel.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.post('/createjob', auth, async(req,res) => {
    try {

        const jobbody = req.body
        console.log(auth)
        console.log(jobbody)
        if(auth){
        const job = new Job({
                ...jobbody,
                userId: auth._id
            })
            job.save()

            console.log("ok")
        }
        else{
            console.log("do not able to do")
        }
    } catch (error) {
        console.log('notok')
    }
})


router.post('/updatejob', auth, async(req,res) => {
    try {
        const jobbody = req.body
        if(auth._id === jobbody.userId){
            console.log('can')
        }else{
            console.log('cannot')
        }
    } catch (error) {
        console.log('error')
    }
})

router.delete('/delete', auth, async(req,res)=>{
    const userId = req.body._id
    try {
        if(auth._id === userId){
            await Job.findByIdAndDelete({_id: userId})
            console.log("Deleted")
        }
        else{
            console.log("cannot delete")
        }
    } catch (error) {
        console.log("ERROR")
    }
})

export default router