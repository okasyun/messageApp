import { Auth, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  DocumentData,
  getDocs,
} from "firebase/firestore";
import firebaseApp from "../firebase";

export const useProfile = () => {
  const [profile, setProfile] = useState<DocumentData | null>(null);

  useEffect(() => {
    const auth: Auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userUid = user.uid;
        const firestore = firebaseApp.firestore;

        // 現在ログインしているユーザーとデータベースのユーザー情報を照らし合わせる
        const q = query(
          collection(firestore, "users"),
          where("uid", "==", userUid)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          setProfile(docData);
        });
      }
    });
  }, []);
  return { profile };
};
