import { compare } from "bcrypt";
import { User } from "../models/user.js";
import { sendToken } from "../utils/features.js";
import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";

const newUser = TryCatch(async (req, res) => {
    const { name, username, password, bio } = req.body;
  
    const avatar = {
      public_id: "sad",
      url: "sfddesf",
    };
  
    const user = await User.create({
      name,
      username,
      password,
      bio,
      avatar,
    });
  
    sendToken(res, user, 201, "User created successfully!");
  })

const login = TryCatch(async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+password");
    if (!user) return next (new ErrorHandler("Invalid Username or Password", 404));
  
    const isMatch = await compare(password, user.password);
    if (!isMatch) return next (new ErrorHandler("Invalid Username or Password", 404));
  
    sendToken(res, user, 200, `Welcome back ${user.name}`);
})

const getMyProfile = async (req, res) => {
    const user = await User.findById(req.user);

    return res.status(200).json({
        success: true,
        user,
    });
}

export {newUser, login, getMyProfile}
