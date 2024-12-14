/* eslint-disable react-hooks/rules-of-hooks */
import Grid from "@mui/material/Grid2";
import Title from "../shared/title";
import Header from "./header";
import ChatList from "../specific/chat-list";
import { samepleChats } from "../../constants/sample-data";
import { useParams } from "react-router-dom";
import Profile from "../specific/profile";
import { useMyChatsQuery } from "../../redux/api/api";
import { Drawer, Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "../../redux/reducers/misc";
import toast from "react-hot-toast";
import { useEffect } from "react";

/* eslint-disable react/display-name */
const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const chatId = params.chatId;

    const { isMobile } = useSelector((state) => state.misc);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat", _id, groupChat);
    };

    const handleMobileClose = () => dispatch(setIsMobile(false))

    return (
      <>
        <Title />
        <Header />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={samepleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}
        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            size={{ sm: 4, md: 3, lg: 3 }}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={samepleChats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid size={{ xs: 12, sm: 8, md: 5, lg: 5 }} height={"100%"}>
            <WrappedComponent {...props} />
          </Grid>
          <Grid
            size={{ md: 4, lg: 4 }}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
