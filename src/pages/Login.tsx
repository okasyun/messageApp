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
import { useLogin } from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { success, error, login } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <Container component="main" maxWidth="xs">
      {/* muiのリセットCSS */}
      <CssBaseline />
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircleIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          ログイン
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="outlined" fullWidth type="submit" sx={{ my: 2 }}>
            ログイン
          </Button>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item xs>
              <Link href="/password-reset" variant="body2" underline="none">
                パスワードを忘れた方
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2" underline="none">
                アカウントををお持ちでない方
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error && (
        <Slide in={error} direction="up">
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            ログインできませんでした
          </Alert>
        </Slide>
      )}
      {success && (
        <Slide in={success} direction="up">
          <Alert severity="success">
            <AlertTitle>ログインに成功しました</AlertTitle>
          </Alert>
        </Slide>
      )}
    </Container>
  );
};

export default Login;
