/* eslint-disable react/prop-types */
import { AlternateEmail as UsernameIcon, Face as FaceIcon, CalendarMonth as CalendarIcon } from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import moment from "moment";
import { transformImage } from "../../lib/features";

const Profile = ({user}) => {
  return (
    <Stack spacing={"2rem"} alignItems={"center"} direction={"column"}>
      <Avatar src={transformImage(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={user?.bio} />
      <ProfileCard heading={"Username"} text={user?.username} Icon={<UsernameIcon />} />
      <ProfileCard heading={"Name"} text={user?.name} Icon={<FaceIcon />} />
      <ProfileCard heading={"Joined"} text={moment(user?.createdAt).fromNow()} Icon={<CalendarIcon />} />
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
