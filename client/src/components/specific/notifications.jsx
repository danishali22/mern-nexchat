/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../../redux/api/api.js";
import { useErrors } from "../../hooks/hook.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc.js";
import toast from "react-hot-toast";

const Notifications = () => {
  const { isNotification } = useSelector((state) => state.misc);

  const dispatch = useDispatch();

  const {isLoading, error, isError, data} = useGetNotificationsQuery();
  const [acceptFriendRequest] = useAcceptFriendRequestMutation();

  useErrors([{error, isError}]);

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptFriendRequest({requestId: _id, accept});
      if(res.data?.success){
        console.log("use socket here");
        toast.success(res.data?.success || "Friend Request Accepted");
      }
      else toast.error(res.data?.error || "Something went wrong");
    } catch (error) {
      toast.error("Something went wrong")
    }
  };

  const closeHandler = () => {
    dispatch(setIsNotification(false));
  }

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data.allRequests.length > 0 ? (
              data.allRequests.map(({ sender, _id }) => (
                <NotificationItem
                  sender={sender}
                  _id={_id}
                  handler={friendRequestHandler}
                  key={_id}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>0 notifications</Typography>
            )}
          </>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar />

        <Typography
          variant="body1"
          sx={{
            flexGlow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {`${name} sent you a friend request.`}
        </Typography>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;