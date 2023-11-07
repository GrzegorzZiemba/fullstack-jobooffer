import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		requried: true,
		trim: true,
	},
	email: {
		type: String,
		unique: true,
		requried: true,
		trim: true,
		lowercase: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Please provide valid email");
			}
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 9,
		trim: true,
	},
	isRecruiter: {
		type :Boolean, 
		required: true,

	},

	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

userSchema.pre("save", async function (next) {
	const user = this;
	
	
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	
	const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET_JWT);

	user.tokens = user.tokens.concat({ token });
	await user.save();

	return token;
};

userSchema.statics.loginUser = async (email, password) => {
	const user = await User.findOne({ email });
	
	if (!user) {
		throw new Error("Cannot login");
	}

	const checkPass = await bcrypt.compare(password, user.password);
	
	if (!checkPass) {
		
		
		throw new Error("Cannot login");
	}

	return user;
};

const User = mongoose.model("User", userSchema);

export default User;
