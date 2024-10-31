/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Stack } from "@mui/material"
import ChatItem from "../shared/chat-item";

const ChatList = ({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [
        {
            chatId: "",
            count: 0,
        }
    ],
    handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"} overflowd={"auto"} height={"100%"}>
        {
            chats.map((data, index) => {
                const {avatar, name, _id, groupChat, members} = data;
                const newMessageAlert = newMessagesAlert.find(
                    ({ chatId }) => String(chatId) === String(_id)
                );
                const isOnline = members?.some((member) => onlineUsers.includes(member));

                return <ChatItem
                    index={index}
                    newMessageAlert={newMessageAlert}
                    isOnline={isOnline}
                    avatar={avatar}
                    name={name}
                    _id={_id}
                    key={_id}
                    groupChat={groupChat}
                    sameSender={String(chatId) === String(_id)}
                    handleDeleteChat={handleDeleteChat}
                />;
            })
        }
    </Stack>
  )
}

export default ChatList