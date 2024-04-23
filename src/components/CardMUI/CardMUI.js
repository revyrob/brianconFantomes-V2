import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ReactAudioPlayer from "react-audio-player";

export default function CardMUI({ chapter }) {
  return (
    <Card
      sx={{ display: "flex" }}
      className="sm: flex-col-reverse rounded-r-lg shadow-xl my-8 mx-12"
    >
      <Box sx={{ display: "flex", flexDirection: "column" }} className="">
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {chapter.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {chapter.chapter}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {/* <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton> */}

          <ReactAudioPlayer src={chapter.audio} controls />
        </Box>
      </Box>
      <CardMedia
        component="img"
        //sx={{ width: 151 }}
        image={chapter.img}
        alt={chapter.title}
        className="sm:brightness-125 h-48 object-cover md:h-52 w-32 transition-all hover:scale-110 ease-in-out object-cover	"
      />
    </Card>
  );
}
