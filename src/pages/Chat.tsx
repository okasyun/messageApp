import { FC, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Avatar, Box, Typography } from "@mui/material";
import { format, formatDistance } from "date-fns";
import { ja } from "date-fns/locale";
import { Timestamp } from "firebase/firestore";

import { useFirestore, useRoomFirestore } from "../hooks/useFirestore";

import { useProfile } from "../hooks/useProfile";
import { Message } from "../types/Message";

import Header from "../components/Header";
import MessageInput from "../components/MessageInput";

type Props = {
  title: string;
};

const Chat = () => {
  // const { title } = props;
  const { id } = useParams();
  const { documents: messages } = useRoomFirestore(id);
  useFirestore("messages");
  const { profile } = useProfile();

  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    bottomRef?.current?.scrollIntoView();
  });

  const time = (date: Timestamp) => {
    let timestamp = formatDistance(new Date(), date.toDate(), {
      locale: ja,
    });
    if (timestamp.indexOf("未満") !== -1) {
      return (timestamp = "たった今");
    } else if (
      timestamp.indexOf("か月") !== -1 ||
      timestamp.indexOf("年") !== -1
    ) {
      return (timestamp = format(date.toDate(), "yyyy年m月d日", {
        locale: ja,
      }));
    } else {
      return (timestamp = `${timestamp}前`);
    }
  };
  return (
    <>
      <Header title="坂本研究室" />
      <Box sx={{ flexGrow: 1, m: 2, pt: 6, pb: 4 }}>
        {messages ? (
          messages.map((message: Message) => (
            <Box
              key={message.id}
              sx={{
                display: "flex",
                flexDirection:
                  profile && profile.uid === message.user.uid
                    ? "row-reverse"
                    : "row",
                my: 2,
                gap: 2,
              }}
            >
              <Box>
                <Avatar
                  src={message.user.image ? message.user.image : ""}
                  alt=""
                />
              </Box>

              <Box sx={{ ml: 2 }}>
                <Typography sx={{ fontSize: "10px" }}>
                  {message.user.name}
                </Typography>
                <Typography
                  sx={{ p: 1, background: "#dddddd", borderRadius: 1 }}
                >
                  {message.text}
                </Typography>
                <Typography sx={{ fontSize: 12 }}>
                  {time(message.createdAt)}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <p>メッセージが存在しません</p>
        )}
        <div ref={bottomRef}></div>
        <MessageInput roomId={id} />
      </Box>
    </>
  );
};

export default Chat;
