import React from "react";
import { useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { TextField, Typography } from "@mui/material";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useProfile } from "../hooks/useProfile";
import firebaseApp from "../firebase";

const AddLaboratory = () => {
  const [labName, setLabname] = useState("");
  const [topic, setTopic] = useState("");
  const [univName, setUnivName] = useState("");
  const [professer, setProfesser] = useState("");
  const [labURL, setLabURL] = useState("");
  const [labDescription, setLabDescription] = useState("");

  const profileData = useProfile();
  const firestore = firebaseApp.firestore;
  const profile = profileData.profile;

  const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const labRef = await addDoc(collection(firestore, "rooms"), {
        labName: labName,
        topic: topic,
        univName: univName,
        professer: professer,
        labURL: labURL,
        labDescription: labDescription,
        createdAt: Timestamp.fromDate(new Date()),
        // 必要ないかも
        user: {
          name: profile?.name,
          image: profile?.image,
          uid: profile?.uid,
        },
      });
    } catch (e) {
      console.error("Error adding document", e);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          alignItem: "center",
          flexDirection: "column",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          研究室登録
        </Typography>
        <Box
          component="form"
          onSubmit={handleChange}
          noValidate
          sx={{
            display: "flex",
            alignItem: "center",
            flexDirection: "column",
            mt: 2,
            gap: "10px",
          }}
        >
          <TextField
            label="研究室の名前を記入してください"
            onChange={(e) => setLabname(e.target.value)}
          />
          <TextField
            label="研究ジャンル"
            onChange={(e) => setTopic(e.target.value)}
          />
          <TextField
            label="大学名"
            onChange={(e) => setUnivName(e.target.value)}
          />

          <TextField
            label="教授名"
            onChange={(e) => setProfesser(e.target.value)}
          />
          <TextField
            label="研究室サイト"
            rows={4}
            onChange={(e) => setLabURL(e.target.value)}
          />
          <TextField
            label="研究室概要"
            rows={5}
            multiline
            onChange={(e) => setLabDescription(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: "main", my: 2 }}
            type="submit"
          >
            登録
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddLaboratory;
