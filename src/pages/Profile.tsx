import {
  Alert,
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import firebaseApp from "../firebase";

import { useProfile } from "../hooks/useProfile";

const Profile = () => {
  const [user, setUser] = useState<User>();
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const firestore = firebaseApp.firestore;
  const firestorage = firebaseApp.firestorage;

  const profileData = useProfile();
  const profile = profileData.profile;

  useEffect(() => {
    const fireAuth = getAuth();
    const unsubscribe = onAuthStateChanged(fireAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("ログインされていません");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files !== null) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const uid = user?.uid;
      const email = user?.email;
      const docRef = collection(firestore, "users");
      if (image) {
        const imageRef = ref(firestorage, image.name);
        uploadBytes(imageRef, image).then(() => {
          getDownloadURL(imageRef).then(async (url) => {
            if (profile) {
              const userRef = doc(firestore, "users", profile?.id);
              await updateDoc(userRef, {
                name,
                image: url,
              });
            } else {
              await addDoc(docRef, {
                name,
                email,
                image: url,
                uid,
              });
            }
          });
        });
      } else {
        if (profile) {
          const userRef = doc(firestore, "users", profile?.id);
          await updateDoc(userRef, {
            name,
          });
        } else {
          await addDoc(docRef, { name, email, image: "", uid });
        }
      }
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper sx={{ mx: 4, mt: 10, p: 4 }}>
        <Typography align="center" variant="h5">
          プロフィール編集
        </Typography>
        <Avatar
          sx={{ margin: "0 auto" }}
          src={
            image ? URL.createObjectURL(image) : profile ? profile.image : ""
          }
          alt=""
        ></Avatar>
        {/* noValidate必要？ */}
        <Box
          component="form"
          // noValidate
          onSubmit={handleSubmit}
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button
            sx={{ textAlign: "left" }}
            variant="contained"
            component="label"
            color="primary"
          >
            <input
              style={{ display: "none" }}
              id="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
            画像を選択
          </Button>

          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            autoComplete="name"
            // 名前が勝手にprofileになる
            value={name ? name : profile ? profile.name : ""}
            autoFocus
            label="ユーザー名"
            onChange={(e) => setName(e.target.value)}
          />
          <Button sx={{ mt: 3 }} variant="outlined" type="submit" fullWidth>
            {profile ? "更新" : "作成"}
          </Button>
        </Box>
        {error && (
          <Alert sx={{ mt: 1 }} severity="error">
            {profile ? "更新" : "作成"}できませんでした
          </Alert>
        )}
        {success && (
          <Alert sx={{ mt: 1 }} severity="success">
            {profile ? "更新" : "作成"}できました
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default Profile;
