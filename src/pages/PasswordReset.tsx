import React, { useState } from "react";
import {
  Avatar,
  Alert,
  AlertTitle,
  Button,
  CssBaseline,
  TextField,
  Box,
  Slide,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

import { usePasswordReset } from "../hooks/useAuth";

const PasswordReset = () => {
  const navigate = useNavigate();
  const { success, error, passwordReset } = usePasswordReset();

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    passwordReset(email);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "success.main" }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          パスワード再設定
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            label="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <Button
            variant="outlined"
            sx={{ my: 2, bgColor: "success.main" }}
            fullWidth
            type="submit"
          >
            送信
          </Button>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item>
              <Link href="/login" variant="body2">
                戻る
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error && (
        <Slide in={error} direction="up">
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            メールアドレスに送信できませんでした
          </Alert>
        </Slide>
      )}
      {success && (
        <Slide in={success} direction="up">
          <Alert severity="success">
            <AlertTitle>メールアドレスに送信しました</AlertTitle>
          </Alert>
        </Slide>
      )}
    </Container>
  );
};

export default PasswordReset;
