import {
  Typography,
  Chip,
  Box,
  Card,
  CardActionArea,
  Dialog,
} from "@mui/material";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import "./VideoStyles.css";
import VideoPreview from "./VideoPreview";

const ProfileSkills = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  const handleClickOpen = (videoUrl) => {
    setOpen(true);
    setSelectedVideo(videoUrl);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const extractPublicId = (videoUrl) => {
    const baseUrlPattern =
      /^https:\/\/res\.cloudinary\.com\/dfr2g1dz6\/video\/upload\/v\d+\//;
    return videoUrl.replace(baseUrlPattern, "").replace(/\.\w+$/, "");
  };

  return (
    <div>
      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        My Interests
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {user?.interests.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            sx={{ backgroundColor: "#f0f0f0", color: "#333" }}
          />
        ))}
      </Box>
      {user?.videos?.length > 0 && (
        <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
          My Videos
        </Typography>
      )}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {user?.videos.map((videoUrl, index) => (
          <Card
            key={index}
            sx={{ width: 160, height: 160, position: "relative" }}
          >
            <CardActionArea
              sx={{ height: "100%" }}
              onClick={() => handleClickOpen(videoUrl)}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#000",
                }}
              >
                <VideoPreview
                  video={{ id: extractPublicId(videoUrl), link: videoUrl }}
                />
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: "80vh" } }}
      >
        <VideoPlayer
          id="demo-player"
          publicId={extractPublicId(selectedVideo)}
          autoPlay={true}
          width="3840"
          height="2160"
        />
      </Dialog>
    </div>
  );
};

export default ProfileSkills;
