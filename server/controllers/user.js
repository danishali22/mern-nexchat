import { User } from "../models/user.js";

export const newUser = async (req, res) => {

    const {name, username, password, bio} = req.body

  const avatar = {
    public_id: "sad",
    url: "sfddesf",
  };

  await User.create({ 
    name, 
    username,
    password,
    bio,
    avatar,
  });

  return res.status(201).json({
    message: "User created successfully",
  });
};

export const login = () => {
  console.log("login user");
};
