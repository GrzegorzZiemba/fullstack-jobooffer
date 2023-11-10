import express from 'express'
import User from '../models/userModel.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/createuser', async(req,res)=> {
    console.log('creating')
    try {
        const user = req.body  
        console.log(user)    
        const createUser = new User({
            ...user
        })
        await createUser.save()
        const token = await createUser.generateAuthToken()
        console.log(token)
        res.send({token})
    } catch (error) {
        console.log("error")
    } 
})

router.post("/login", async (req, res) => {
    console.log("Login")
	try {
		const user = await User.loginUser(req.body.email, req.body.password);
		const token = await user.generateAuthToken();
	
        console.log(token)
        res.cookie('jwt', token, {
		httpOnly: true,
        })
        res.send({token})

		
	} catch (e) {
		res.status(400).send({ error: "Cannot login" });
	}
});

router.post("/logout", auth, async (req, res) => {
    if(auth){
        const myId = JSON.parse(req.body.id);
        const id = mongoose.Types.ObjectId(myId);
        try {
            const user = await User.findById({ _id: id });
            user.tokens = [];
            user.save();
            res.cookie('jwt', '', {
                httpOnly: true,
                expires: new Date(0),
              });
            res.status(200).send({ text: "Logged Out" });
        } catch (e) {
            res.status(400).send({ error: "Cannot logout" });
        }
    }else{
        console.log("Cannot Logout")
    }
	
});

export default router