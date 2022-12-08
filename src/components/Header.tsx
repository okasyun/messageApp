import React, { FC, useEffect, useState } from "react";
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

type Props = {
  title: string;
};
const Header: FC<Props> = (props: Props) => {
  const { title } = props;
  const { profile } = useProfile();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const fireauth = firebaseApp.fireauth;

  // ログイン未完了ならログインページに遷移
  useEffect(() => {
    // Promise型じゃない
    const unsubscribe = onAuthStateChanged(fireauth, (user) => {
      if (!user) {
        navigate("/login");
      }
      // setAuthにするとエラーになる
      else {
        // 現在のuser
        setAuth(true);
      }
    });
    return () => unsubscribe();
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Link
              href="/all-laboratory"
              sx={{ color: "white", textDecoration: "none" }}
            >
              {title}
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
                <MenuItem onClick={handleClose}>
                  <Link href="/all-laboratory" underline="none" color="inherit">
                    研究室一覧
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/add-laboratory" underline="none" color="inherit">
                    研究室登録
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
