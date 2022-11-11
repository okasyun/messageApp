import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import firebaseApp from "../firebase";

import { useNavigate } from "react-router-dom";

const fireauth = firebaseApp.fireauth;

// パスワードの変更
export const usePasswordReset = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const passwordReset = async (email: string) => {
    await sendPasswordResetEmail(fireauth, email)
      .then(() => {
        setSuccess(true);
        console.log("Success: Password reset email Sent");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });
  };

  return { success, error, passwordReset };
};

// ログアウト
export const useLogout = () => {
  const logout = async () => {
    await signOut(fireauth)
      .then((res) => console.log("Sign-out successful"))
      .catch((err) => console.log(err.message));
  };
  return { logout };
};

// アカウント登録
export const useSignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const signup = async (email: string, password: string) => {
    setError(null);
    await createUserWithEmailAndPassword(fireauth, email, password)
      .then((res) => {
        console.log(res.user);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });
  };

  return { error, signup };
};

// ログイン
export const useLogin = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const login = async (email: string, password: string) => {
    setError(null);
    await signInWithEmailAndPassword(fireauth, email, password)
      .then((res) => {
        console.log(res.user);
        setSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err.message);
      });
  };
  return { success, error, login };
};
