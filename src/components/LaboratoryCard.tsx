import { FC } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

type Props = {
  labName: string;
  professer: string;
  univName: string;
  id: string;
  topic: string;
};
const LaboratoryCard: FC<Props> = (props: Props) => {
  const navigate = useNavigate();

  const { labName, id, univName, professer, topic } = props;
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
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              navigate("chat");
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
