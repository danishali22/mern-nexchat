/* eslint-disable react/prop-types */
import {
    Button,
    Dialog,
    DialogTitle,
    Skeleton,
    Stack,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
  import UserItem from "../shared/user-item";
  import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";
import { useAddMemberMutation, useAvailableFriendsQuery } from "../../redux/api/api";
import { useAsyncMutation, useErrors } from "../../hooks/hook";

  const AddMemberDialog = ({ chatId }) => {
    const dispatch = useDispatch();

    const { isAddMember } = useSelector((state) => state.misc);

    const [selectedMembers, setSelectedMembers] = useState([]);
    const {data, isLoading, error, isError} = useAvailableFriendsQuery(chatId);

    const [addMembers, isLoadingAddMembers] = useAsyncMutation(
      useAddMemberMutation
    );
  
    const selectMemberHandler = (id) => {
      setSelectedMembers((prev) =>
        prev.includes(id)
          ? prev.filter((currElement) => currElement !== id)
          : [...prev, id]
      );
    };
  
    const closeHandler = () => {
      setSelectedMembers([]);
      dispatch(setIsAddMember(false));
    };
    const addMemberSubmitHandler = () => {
      addMembers("Adding Members...", { members: selectedMembers, chatId });
      closeHandler();
    };

    useErrors([{ isError, error }]);

    return (
      <Dialog open={isAddMember} onClose={closeHandler}>
        <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
          <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

          <Stack spacing={"1rem"}>
            {isLoading ? (
              <Skeleton />
            ) : data?.friends?.length > 0 ? (
              data?.friends?.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(i._id)}
                />
              ))
            ) : (
              <Typography textAlign={"center"}>No Friends</Typography>
            )}
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
          >
            <Button color="error" onClick={closeHandler}>
              Cancel
            </Button>
            <Button
              onClick={addMemberSubmitHandler}
              variant="contained"
              disabled={isLoadingAddMembers}
            >
              Submit Changes
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    );
  };
  
  export default AddMemberDialog;