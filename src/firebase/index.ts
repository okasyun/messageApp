import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { firebaseConfig } from "./config";

initializeApp(firebaseConfig);

const firestore = getFirestore();
const fireauth = getAuth();
const firestorage = getStorage();

const firebaseApp = {
  fireauth,
  firestore,
  firestorage,
};

export default firebaseApp;
