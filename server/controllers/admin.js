import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";

const allUsers = TryCatch(async(req,res,next)=>{
    const users = await User.find({});

    const transformedUsers = await Promise.all(
        users.map(async({_id, name, username, avatar})=>{
            const [groupChats, friendChats] = await Promise.all([
                Chat.countDocuments({groupChat: true, members: _id}),
                Chat.countDocuments({groupChat: false, members: _id}),
            ]);

            return {
                _id, 
                name,
                username,
                avatar: avatar.url,
                groupChats,
                friendChats
            }
        })
    );

    return res.status(200).json({
        success: true,
        users: transformedUsers,
    });
})


const allChats = TryCatch(async(req,res,next)=>{
    const chats = await Chat.find({});

    return res.status(200).json({
        success: true,
        chats,
    });
})


const allMessages = TryCatch(async(req,res,next)=>{
    const messages = await Message.find({});

    return res.status(200).json({
        success: true,
        messages,
    });
})


const getDashboardStats = TryCatch(async(req,res,next)=>{


    return res.status(200).json({
        success: true,
        message: "Stats",
    });
})


export {
    allUsers,
    allChats,
    allMessages,
    getDashboardStats,
}