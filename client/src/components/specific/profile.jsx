/* eslint-disable react/prop-types */
import { AlternateEmail as UsernameIcon, Face as FaceIcon, CalendarMonth as CalendarIcon } from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import moment from "moment";

const Profile = () => {
  return (
    <Stack spacing={"2rem"} alignItems={"center"} direction={"column"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={"I am Bio"} />
      <ProfileCard heading={"Username"} text={"I am username"} Icon={<UsernameIcon />} />
      <ProfileCard heading={"Name"} text={"I am name"} Icon={<FaceIcon />} />
      <ProfileCard heading={"Joined"} text={moment('2024-05-20T00:00:00.000Z').fromNow()} Icon={<CalendarIcon />} />
    </Stack>
  );
};

const ProfileCard = ({ heading, text, Icon }) => (
  <Stack
    spacing={"1rem"}
    alignItems={"center"}
    direction={"row"}
    textAlign={"center"}
    color={"white"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant={"body1"}>{text}</Typography>
      <Typography color={"grey"} variant={"caption"}>
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
