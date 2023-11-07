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
    } catch (error) {
        console.log("error")
    } 
})

router.post("/login", async (req, res) => {
	try {
		const user = await User.loginUser(req.body.email, req.body.password);

		const token = await user.generateAuthToken();
		const mail = user.email;
		const id = user._id.toString();

		res.send({ mail, token, id });
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
            res.status(200).send({ text: "Logged Out" });
        } catch (e) {
            res.status(400).send({ error: "Cannot logout" });
        }
    }else{
        console.log("Cannot Logout")
    }
	
});

export default router