import express from "express";
import {
  acceptFirendRequest,
  getMyFriends,
  getMyNotifications,
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFirendRequest,
} from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  loginValidator,
  resgisterValidator,
  sendRequestValidator,
  acceptRequestValidator,
  validateHandler,
} from "../lib/validator.js";

const app = express();

app.post("/login", loginValidator(), validateHandler, login); // we return array in loginValidator that why we call like this loginValidator() and we dont return array in validateHandler thats we simpply call validateHandler without brackets
app.post("/new", singleAvatar, resgisterValidator(), validateHandler, newUser);

app.use(isAuthenticated);
app.get("/me", getMyProfile);
app.get("/logout", logout);
app.get("/search", searchUser);
app.put(
  "/send-request",
  sendRequestValidator(),
  validateHandler,
  sendFirendRequest
);
app.put(
  "/accept-request",
  acceptRequestValidator(),
  validateHandler,
  acceptFirendRequest
);
app.get("/notifications", getMyNotifications);
app.get("/friends", getMyFriends);

export default app;
