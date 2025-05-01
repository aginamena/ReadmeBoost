import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";

export default function Benefit({
  title,
  body,
  imgPath,
}: {
  title: string;
  body: string;
  imgPath: string;
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Image src={imgPath} width={500} height={500} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {body}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
