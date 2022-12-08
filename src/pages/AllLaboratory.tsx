import firebaseApp from "../firebase";
import styled from "styled-components";
import { Box } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import LaboratoryCard from "../components/LaboratoryCard";

import { useRoomId } from "../hooks/useFirestore";
import Header from "../components/Header";

export type labInfo = {
  id: string;
  labName: string;
  professer: string;
  topic: string;
  univName: string;
  labURL: string;
  labDescription: string;
  user: {
    name: string;
    uid: string;
    image: string;
  };
};

const firestore = firebaseApp.firestore;
const AllLaboratory = () => {
  const [labId, setlabId] = useState<labInfo[]>([]);

  useEffect(() => {
    const docRef = collection(firestore, "rooms");
    const unsub = onSnapshot(docRef, (snapshot) => {
      let results: any = [];
      // let results: any = [];
      snapshot.docs.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setlabId(results);
    });

    return () => unsub();
  }, []);

  return (
    <>
      <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
        研究室一覧ページ
      </Typography>
      <Header title="研究室一覧ページ" />
      <LabList>
        {labId.map((lab: labInfo) => (
          <>
            <LaboratoryCard
              labName={lab.labName}
              professer={lab.professer}
              id={lab.id}
              univName={lab.univName}
              topic={lab.topic}
              labURL={lab.labURL}
              labDescription={lab.labDescription}
            ></LaboratoryCard>
            <Box mb={3}></Box>
          </>
        ))}
      </LabList>
    </>
  );
};

export default AllLaboratory;

const LabList = styled.div`
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 30px;
  gap: 40px;
  width: 95%;
`;
