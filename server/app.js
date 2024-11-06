import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import {Server} from "socket.io"
import {createServer} from "http";
import {v4 as uuid} from "uuid";

import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import adminRoutes from "./routes/admin.js";
import { disconnect } from "mongoose";
import { NEW_MESSAGE } from "./constants/event.js";

dotenv.config({
  path: "./.env",
});
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";
const adminSecretKey = process.env.ADMIN_SECRET_KEY || "admin";
const userSocketIds = new Map();

connectDB(mongoUri);
// createUser(10);  use to create fake users

const app = express();
const server = createServer(app);
const io = new Server(server, {});

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Home Route");
});

io.on("connection", (socket)=>{
  const user = {
    _id: "asdfw",
    name: "Bhola",
  }
  userSocketIds.set(user._id, socket.id);
  console.log(userSocketIds);
  console.log("A user connection with socket id", socket.id);
  
  socket.on(NEW_MESSAGE, async ({chatId, members, message})=>{
   const messageForRealTime = {
    content: message,
    id: uuid(),
    sender: {
      _id: user._id,
      name: user.name,
    },
    chat: chatId,
    createdAt: new Date().toISOString(),
   };

   const messageForDB = {
    content: message,
    sender: user._id,
    chat: chatId,
   };

    console.log("New message", messageForRealTime);  
  })
  socket.on("disconnect", ()=>{
    console.log("A user disconnected with socket id", socket.id);
  });
});

app.use(errorMiddleware);

server.listen(port, () => {
  console.log(`Server is running on port ${port} in ${envMode} Mode`);
});

export {adminSecretKey, envMode};
