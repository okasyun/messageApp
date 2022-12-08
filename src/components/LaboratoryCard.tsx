import { FC } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";

import { useRoomId } from "../hooks/useFirestore";

type Props = {
  labName: string;
  professer: string;
  univName: string;
  id: string;
  topic: string;
  labURL: string;
  labDescription: string;
};
const LaboratoryCard: FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  const { labName, id, univName, professer, topic, labURL, labDescription } =
    props;
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {`研究室名：${labName}`}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {`教授名：${professer}`}
          </Typography>
          <Typography
            component="div"
            color="text.secondary"
          >{`研究内容：${topic}`}</Typography>
          <Typography
            component="div"
            color="text.secondary"
          >{`大学名：${univName}`}</Typography>
          <Typography
            component="div"
            color="text.secondary"
            gutterBottom
          >{`教授名：${professer}`}</Typography>
          <Link href={labURL}>{`URL:${labURL}`}</Link>
          <Typography
            component="div"
            color="text.secondary"
            gutterBottom
          >{`研究室概要：${labDescription}`}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              navigate(`room/${id}`);
            }}
          >
            教授と会話してみよう
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default LaboratoryCard;
