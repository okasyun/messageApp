import React, { useState } from "react";
import {
  Avatar,
  Alert,
  AlertTitle,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Grid,
  Link,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useSignup } from "../hooks/useAuth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error } = useSignup();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(email, password);
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
          ユーザー登録
        </Typography>

        {/* noValidate:フォームの入力内容を無効化する */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* autoComplete：入力の自動補完 */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="パスワード"
            type="password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ my: 2, bgcolor: "success.main" }}
          >
            ユーザー登録
          </Button>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item>
              <Link
                href="https://okasyun.github.io/messageApp/login"
                variant="body2"
              >
                ログインはこちら
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          ユーザー登録ができませんでした
        </Alert>
      )}
    </Container>
  );
};

export default Signup;
