import { TryCatch } from "../middlewares/error.js";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { deleteFilesFromCloudinary, emitEvent, uploadFilesToCloudinary } from "../utils/features.js";
import {
  ALERT,
  NEW_ATTACHMENT,
  NEW_MESSAGE_ALERT,
  REFETCH_CHATS,
} from "../constants/event.js";
import { getOtherMember } from "../lib/helper.js";
import { User } from "../models/user.js";

const newGroupChat = TryCatch(async (req, res, next) => {
  const { name, members } = req.body;

  const allMembers = [...members, req.user];

  await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${name} group`);
  emitEvent(req, REFETCH_CHATS, members);

  return res.status(201).json({
    success: true,
    message: "Group Chat created successfully",
  });
});

const getMyChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({ members: req.user }).populate(
    "members",
    "name avatar"
  );

  const transformedChats = chats.map(
    ({ _id, groupChat, creator, name, members }) => {
      const otherMember = getOtherMember(members, req.user);
      return {
        _id,
        groupChat,
        creator,
        name: groupChat ? name : otherMember.name,
        avatar: groupChat
          ? members.slice(0, 3).map(({ avatar }) => avatar.url)
          : [otherMember.avatar.url],
        members: members.reduce((prev, curr) => {
          if (curr._id.toString() !== req.user.toString()) {
            prev.push(curr._id);
          }
          return prev;
        }, []),
      };
    }
  );

  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const getMyGroups = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name avatar");

  const groups = chats.map(({ _id, groupChat, name, members }) => ({
    _id,
    groupChat,
    name,
    avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
  }));

  return res.status(200).json({
    success: true,
    groups,
  });
});

const addMembers = TryCatch(async (req, res, next) => {
  const { chatId, members } = req.body;
  const chat = await Chat.findById(chatId);

  if (!members || members.length < 1)
    return next(new ErrorHandler("Please provide members", 400));

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not group chat", 400));

  if (chat.creator.toString() !== req.user.toString())
    return next(new ErrorHandler("You are not allowed to add members", 403));

  const allMembersPromise = members.map((member) =>
    User.findById(member, "name")
  );

  const allNewMembers = await Promise.all(allMembersPromise);

  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);

  chat.members.push(...uniqueMembers);

  if (chat.members.length > 100) {
    return next(new ErrorHandler("Group members limit reached", 400));
  }

  await chat.save();

  const allUsersName = allNewMembers.map((i) => i.name).join(", ");

  emitEvent(req, ALERT, chat.members, `${allUsersName} added in the group`);

  return res.status(200).json({
    success: true,
    message: `${allUsersName} added in the group successfully!`,
  });
});

const removeMember = TryCatch(async (req, res, next) => {
  const { chatId, userId } = req.body;
  const [chat, removedUser, userInChat] = await Promise.all([
    Chat.findById(chatId),
    User.findById(userId, "name"),
    Chat.findOne({ _id: chatId, members: userId }),
  ]);

  if (!userInChat)
    return next(new ErrorHandler(`${removedUser.name} not in this group`, 404));

  if (!userId) return next(new ErrorHandler("User not found", 404));

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not group chat", 400));

  if (chat.creator.toString() !== req.user.toString())
    return next(new ErrorHandler("You are not allowed to add members", 403));

  if (chat.members.length <= 3) {
    return next(new ErrorHandler("Group have at least 3 members", 400));
  }
  chat.members = chat.members.filter(
    (member) => member.toString() !== removedUser._id.toString()
  );

  await chat.save();

  emitEvent(
    req,
    REFETCH_CHATS,
    chat.members,
    `${removedUser.name} has been removed from the group`
  );

  return res.status(200).json({
    success: true,
    message: `${removedUser.name} has been removed from the group successfully!`,
  });
});

const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.groupChat)
    return next(new ErrorHandler("This is not group chat", 400));
  const remainingMembers = chat.members.filter(
    (member) => member.toString() !== req.user.toString()
  );

  if (remainingMembers.length < 3)
    return next(new ErrorHandler("Group must have at least 3 members"));

  if (chat.creator.toString() === req.user.toString()) {
    const randomElement = Math.floor(Math.random() * remainingMembers.length);
    const newCreator = remainingMembers[randomElement]; // new creator is any random group member
    // const newCreator = remainingMembers[0];  new creator is most recent group member
    chat.creator = newCreator;
  }

  chat.members = remainingMembers;

  const [user] = await Promise.all([
    User.findById(req.user, "name"),
    chat.save(),
  ]);

  emitEvent(req, ALERT, chat.member, `${user.name} has left the group`);

  return res.status(200).json({
    success: true,
    message: `${user.name} has left the group successfully`,
  });
});

const sendAttachments = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;

  const files = req.files || [];

  if(files.length < 1) return next(new ErrorHandler("Please Upload Attachment", 400));
  if(files.length > 5) return next(new ErrorHandler("Files can't br more than 5", 400));

  const [chat, me] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user, "name"),
  ]);

  if (!chat) return next(new ErrorHandler("Chat not found", 400));

  if (files.length < 1)
    return next(new ErrorHandler("Please provide attachments", 400));

  if (files.length > 5)
    return next(new ErrorHandler("Files Can't be more than 5", 400));

  const attachments = await uploadFilesToCloudinary(files);
  const messageForDB = {
    content: "",
    attachments,
    sender: me._id,
    chat: chatId,
  };

  const messageForRealTime = {
    ...messageForDB,
    sender: {
      _id: me._id,
      name: me.name,
    },
  };

  const message = await Message.create(messageForDB);

  emitEvent(req, NEW_ATTACHMENT, chat.members, {
    message: messageForRealTime,
    chatId,
  });

  emitEvent(req, NEW_MESSAGE_ALERT, chat.members, { chatId });

  return res.status(200).json({
    success: true,
    message,
  });
});

const getChatDetails = TryCatch(async (req, res, next) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params.id)
      .populate("members", "name avatar")
      .lean();

    if (!chat) return next(new ErrorHandler("Chat not found", 400));

    chat.members = chat.members.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(req.params.id);

    if (!chat) return next(new ErrorHandler("Chat not found", 400));

    return res.status(200).json({
      success: true,
      chat,
    });
  }
});

const renameGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const { name } = req.body;

  const chat = await Chat.findById(chatId);
  if(!chat) return next(new ErrorHandler("Chat not found", 400));
  if(!chat.groupChat) return next(new ErrorHandler("This is not a group chat", 400));

  if(chat.creator.toString() !== req.user.toString())
    return next(new ErrorHandler("You are not alowed to rename this group", 403));

  chat.name = name;

  await chat.save();
  emitEvent(req, REFETCH_CHATS, chat.members);
  
  return res.status(200).json({
    success: true,
    message: "Group renamed successfully!",
  });
});

const deleteChat = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);
  if(!chat) return next(new ErrorHandler("Chat not found", 400));
  
  const members = chat.members;

  if(chat.groupChat && chat.creator.toString() !== req.user.toString())
    return next(new ErrorHandler("You are not alowed to delete this group chat", 403));
  
  if(!chat.groupChat && !members.include(req.user.toString()))
    return next(new ErrorHandler("You are not alowed to delete this chat", 403));

  // here we delete all message as well as attachments or files from cloudinary
  const messagesWithAttachments = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });

  const public_ids = [];

  messagesWithAttachments.forEach((attachment)=>{
    attachment.attachments.forEach(({public_id})=>{
      public_ids.push(public_id);
    });
  });

  await Promise.all([
    deleteFilesFromCloudinary(public_ids),
    Chat.deleteOne(),
    Message.deleteMany({chat: chatId}),
  ]);

  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Chat deleted successfully!",
  });
});

const getMessages = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const {page = 1} = req.query;
  const limit = 20;
  const skip = (page - 1) * limit;

  const chat = await Chat.findById(chatId);

  if (!chat) return next(new ErrorHandler("Chat not found", 404));

  if (!chat.members.includes(req.user.toString()))
    return next(
      new ErrorHandler("You are not allowed to access this chat", 403)
    );

  const [messages, totalMessagesCount] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("sender", "name")
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ]);
  
  const totalPages = Math.ceil(totalMessagesCount/limit) || 0;
  console.log("totalPages", totalPages);

  return res.status(200).json({
    success: true,
    messages: messages.reverse(),
    totalPages,
  });
});

export {
  newGroupChat,
  getMyChats,
  getMyGroups,
  addMembers,
  removeMember,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages
};
