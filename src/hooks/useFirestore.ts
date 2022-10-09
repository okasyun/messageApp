import { useState, useEffect } from "react";
import { firebaseApp } from "../firebase";
import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  onSnapshot,
  orderBy,
  QueryDocumentSnapshot,
  query,
  SnapshotOptions,
} from "firebase/firestore";

import { Message } from "../types/Message";

const messageConverter: FirestoreDataConverter<Message> = {
  /**
   * Book オブジェクトを Firestore ドキュメントデータへ変換します。
   */
  toFirestore(data: Message): DocumentData {
    // id は Firestore のパスで表現されるのでドキュメントデータには含めない。
    // 下記の updatedAt のように、自動で更新時刻のフィールドを追加することも可能。
    return data;
  },

  /**
   * Firestore ドキュメントデータを Book オブジェクトへ変換します。
   */
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message {
    const data = snapshot.data(options);
    // Book オブジェクトの id プロパティには Firestore ドキュメントの id を入れる。
    return {
      id: snapshot.id,
      text: data.text,
      createdAt: data.createdAt,
      user: data.user,
    };
  },
};

const firestore = firebaseApp.firestore;

const useFirestore = (data: string) => {
  const [documents, setDocuments] = useState<Message[]>([]);

  useEffect(() => {
    const docRef = collection(firestore, data).withConverter(messageConverter);
    const queryRef = query(docRef, orderBy("createdAt"));
    const unsub = onSnapshot(queryRef, (snapshot) => {
      let results: Message[] = [];
      // let results: any = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
    });

    return () => unsub();
  }, [data]);

  return { documents };
};

export default useFirestore;
