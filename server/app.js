import express from "express";
import userRoute from "./routes/user.js";

const app = express();

const port = 3000;
app.use("/user", userRoute);

app.get("/", (req,res)=>{
    res.send("Home Route");
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})