/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import  {
  Fragment,
  useCallback,
  useRef,
  useState
} from "react";
import AppLayout from "../components/layout/app-layout"
import { IconButton, Skeleton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/styles/StyledComponent";
import { sampleMessage } from "../constants/sample-data";
import MessageComponent from "../components/shared/message-component";
import FileMenu from "../components/dialog/file-menu";
import { getSocket } from "../socket";
import { NEW_MESSAGE } from "../constants/event";
import { useChatDetailsQuery } from "../redux/api/api";
import { useErrors, useSocketEvents } from "../hooks/hook";

const Chat = ({chatId, user}) => {
  const containerRef = useRef(null);

  const socket = getSocket();
  const chatDetails = useChatDetailsQuery({chatId, skip: !chatId});

  const errors = [{error: chatDetails.error, isError: chatDetails.isError}]

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  const members = chatDetails?.data?.chat?.members;

  const submitHandler = (e) => {
    e.preventDefault();
    if(!message.trim()) return;
    socket.emit(NEW_MESSAGE, {chatId, members, message});
    setMessage("");
  }

  const newMessageHandler = useCallback((data)=>{
    setMessages((prev)=> [...prev, data.message]);
  }, [])

  const eventHandler = {[NEW_MESSAGE]: newMessageHandler}

  useSocketEvents(socket, eventHandler);

  useErrors(errors);

  return chatDetails.isLoading ? ( <Skeleton /> ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {messages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>

      <form
        onSubmit={submitHandler}
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          >
            <AttachFileIcon />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <IconButton
            type="submit"
            sx={{
              rotate: "-30deg",
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </Fragment>
  );
}

export default AppLayout()(Chat)