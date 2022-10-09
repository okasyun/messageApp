import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./config";

const firebase = initializeApp(firebaseConfig);

const firestore = getFirestore(firebase);
const fireauth = getAuth(firebase);
const firestorage = getStorage(firebase);

export const firebaseApp = {
  fireauth,
  firestore,
  firestorage,
};
