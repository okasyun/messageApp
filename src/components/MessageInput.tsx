import { useState } from "react";
import { Alert, Box, Button, Divider, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import firebaseApp from "../firebase/index";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useProfile } from "../hooks/useProfile";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const profileData = useProfile();
  const profile = profileData.profile;

  const handleClick = async () => {
    setError(false);
    const firestore = firebaseApp.firestore;

    // 入力しない場合エラー

    if (message === "") {
      setError(true);
      return;
    }

    // 各研究室のidを置く
    const labName = "岡本研究室";
    try {
      console.log("Success: Sent");

      const messagePath = collection(firestore, "rooms", labName, "messages");

      const messageRef = await addDoc(messagePath, {
        text: message,
        createdAt: Timestamp.fromDate(new Date()),
        user: {
          name: profile?.name,
          image: profile?.image,
          uid: profile?.uid,
        },
      });
      setMessage("");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "0",
        width: "100%",
        zIndex: "9999",
        backgroundColor: "white",
      }}
    >
      <Divider />
      <Stack direction="row" spacing={2} sx={{ margin: "0.5rem 1.5rem" }}>
        <TextField
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          size="small"
          label="メッセージ"
          id="message"
          autoFocus
          fullWidth
          sx={{ flex: 1 }}
        />
        <Button
          onClick={() => {
            handleClick();
            setMessage("");
          }}
          variant="contained"
          endIcon={<SendIcon />}
        >
          送信
        </Button>
        {error && <Alert severity="error">送信できませんでした</Alert>}
      </Stack>
    </Box>
  );
};

export default MessageInput;
