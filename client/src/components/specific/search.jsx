/* eslint-disable no-undef */
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import UserItem from "../shared/user-item";
import { useState } from "react";
import { sampleUsers } from "../../constants/sameple-data";

const Search = () => {
  const search = useInputValidation("");
  let isLoadingSendFriendRequest = false;
  const addFriendHandler = (id) => {
    console.log(id);
  }
  const [users, setUsers] = useState(sampleUsers);
  return (
    <Dialog open>
      <Stack p={"2rem"} width={"25rem"} direction={"column"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label="Search"
          variant="outlined"
          value={search.value}
          onChange={search.changeHandler}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((i) => (
            <UserItem
              user={i}
              key={i._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
