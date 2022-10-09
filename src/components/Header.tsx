import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Avatar,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
  Slide,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";
import { onAuthStateChanged } from "firebase/auth";

import { useLogout } from "../hooks/useAuth";
import firebaseApp from "../firebase/index";
import { useProfile } from "../hooks/useProfile";
const Header = () => {
  const { profile } = useProfile();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  // useEffectは使う必要ない？
  const fireauth = firebaseApp.fireauth;
  useEffect(() => {
    // Promise型じゃない
    const unsubscribe = onAuthStateChanged(fireauth, (user) => {
      if (!user) {
        navigate("/login");
      }
      // setAuthにするとエラーになる
      else {
        setAuth(true);
      }
    });
    // なぜ実行？
    return () => unsubscribe();
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    logout();
    setOpen(true);
    setAnchorEl(null);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // setOpen(false);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "center" }}>
          {/* あまりの部分をTypogが占める */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" sx={{ color: "white", textDecoration: "none" }}>
              チャットアプリ
            </Link>
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {profile && profile.image ? (
                  <Avatar
                    sx={{ margin: "0 auto" }}
                    src={profile.image}
                    alt=""
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link href="/profile" underline="none" color="inherit">
                    プロフィール
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Slide in={open} direction="up">
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            ログアウトに成功しました
          </Alert>
        </Slide>
      </Snackbar>
    </Box>
  );
};

export default Header;
