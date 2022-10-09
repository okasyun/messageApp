import { Timestamp } from "firebase/firestore";

export type Message = {
  id: string;
  text: string;
  createdAt: Timestamp;
  user: {
    name: string;
    uid: string;
    image: string;
  };
};
