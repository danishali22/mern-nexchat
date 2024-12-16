import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";
import { User } from "../models/user.js";

const isAuthenticated = (req, res, next) =>{
    const token = req.cookies["nexchat-token"];
    if(!token) return next(new ErrorHandler("Please login to access this route", 401));
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData._id;
    next();
}

const adminOnly = (req, res, next) => {
    const token = req.cookies["nexchat-admin-token"];
    if(!token) return next(new ErrorHandler("Only admin can access this route", 401));
    const secretKey = jwt.verify(token, process.env.JWT_SECRET);

    const isMatched = secretKey === adminSecretKey;
    if(!isMatched) return next(new ErrorHandler("Only admin can access this route", 401));
    next();
}

const socketAuthentication = async (err, socket, next) => {
  try {
    if (err) return next(err);
    const authToken = socket.request.cookies["nexchat-token"];

    if (!authToken)
      return next(new ErrorHandler("Please login to access this route", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findById(decodedData._id);

    if (!user)
      return next(new ErrorHandler("Please login to access this route", 401));

    socket.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Please login to access this chat", 401));
  }
};

export { isAuthenticated, adminOnly, socketAuthentication };