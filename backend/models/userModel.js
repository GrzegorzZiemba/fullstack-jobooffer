import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
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
    type: Boolean,
    required: false,
    default: false,
  },

  tokens: {
    type: String,
  },
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
  user.tokens = token;
  await user.save();

  //   res.cookie('jwt', token, {
  // 	httpOnly: true,
  // 	secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
  // 	sameSite: 'strict', // Prevent CSRF attacks
  // 	maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  //   });

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
