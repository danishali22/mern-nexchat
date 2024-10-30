/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { memo } from 'react'
import { Link } from '../styles/StyledComponent'
import { Stack, Typography } from '@mui/material'
import AvatarCard from './avatar-card'

const ChatItem = ({
    avatar = [],
    _id,
    name,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChatOption,
}) => {
  return (
    <Link to={`/chat/${_id}`} sx={{padding: 0}} onContextMenu={(e)=> handleDeleteChatOption(e, _id, groupChat)}>
        <div style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            padding: "1rem",
            backgroundColor: sameSender ? "black" : "unset",
            color: sameSender ? "white" : "unset",
            position: "relative",
        }}>

        <AvatarCard avatar={Array.isArray(avatar) ? avatar : [avatar]} />
        <Stack>
            <Typography>{name}</Typography>
            {newMessageAlert && (
                <Typography>{newMessageAlert.count} New Message</Typography>
            )}
        </Stack>

        </div>
    </Link>
  )
}

export default memo(ChatItem)