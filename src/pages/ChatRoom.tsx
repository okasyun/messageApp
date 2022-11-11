// import firebaseApp from "../firebase/index";
// import {
//   collection,
//   addDoc,
//   Timestamp,
//   query,
//   where,
//   orderBy,
// } from "firebase/firestore";

// import {useCollectionData}
// import { FC, useEffect, useState } from "react";
// import { User } from "firebase/auth";
// import { onAuthStateChanged } from "firebase/auth";

// const firestore = firebaseApp.firestore;
// const fireauth = firebaseApp.fireauth;

// type Props = {
//   currentRoom: string;
// };
// const ChatRoom: FC<Props> = (props: Props) => {
//   const { currentRoom } = props;

//   const [user, setUser] = useState<User | null>();
//   const [message, setMessage] = useState("");
//   const messagesRef = collection(firestore, "messages");

//   // const query = messagesRef
//   //   .where("room", "==", currentRoom)
//   //   .orderBy("createdAt")
//   //   .limit(20);

//   const q = query(
//     messagesRef,
//     where("room", "==", currentRoom),
//     orderBy("createdAt")
//   );

//   const [messages] = useCollectio

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(fireauth, (user) => {
//       if (user) {
//         setUser(user);
//         console.log(user);
//       } else {
//         console.log("ログインされていません");
//       }
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const photoURL = user?.photoURL;
//     const uid = user?.uid;
//     const createdAt = Timestamp.fromDate(new Date());
//     console.log(photoURL, uid);
//     await addDoc(messagesRef, {
//       uid,
//       photoURL,
//       text: message,
//       room: currentRoom,
//       createdAt: createdAt,
//     });
//   };

//   return (
//     <div className="messages">
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Enter message"
//         />
//         <button type="submit" disabled={!message}>
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatRoom;
import React from "react";

const ChatRoom = () => {
  return <div>ChatRoom</div>;
};

export default ChatRoom;
