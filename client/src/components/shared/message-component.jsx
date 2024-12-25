/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { lightBlue } from "../../constants/color";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./render-attachment";
// import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = String(sender?._id) === String(user._id);
  const timesAgo = moment(createdAt).fromNow();
  return (
    <div
      // initial={{ opacity: 0, x: "-100%" }}
      // whileinview={{ opacity: 1, x: 0 }}
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        padding: "0.5rem",
        borderRadius: "5px",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography variant="caption" fontWeight={"600"} color={lightBlue}>
          {sender.name}
        </Typography>
      )}

      {content && <Typography>{content}</Typography>}

      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = fileFormat(url);
          return (
            <Box key={index}>
              <a href={url} target="_blank" download style={{ color: "black" }}>
                {/* <RenderAttachment file={file} url={url} /> */}
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color="text.secondary">
        {timesAgo}
      </Typography>
    </div>
  );
};

export default MessageComponent;
