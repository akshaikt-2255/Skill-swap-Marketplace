import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  Typography,
  CardActionArea,
  Dialog,
  Card,
} from "@mui/material";
import { getImageUrl } from "../../utils";
import VideoPlayer from "../Profile/VideoPlayer";
import VideoPreview from "../Profile/VideoPreview";

const UserDetailPage = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  useEffect(() => {
    // Fetch the user details from the API
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/auth/user/id/${userId}`
        );
        if (!response.ok) {
          throw new Error("Could not fetch user details");
        }
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

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
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              mb: 2,
            }}
          >
            <Avatar
              alt="Profile Picture"
              src={
                userDetails?.profilePicture &&
                (typeof userDetails?.profilePicture === "string"
                  ? getImageUrl(userDetails.profilePicture)
                  : URL.createObjectURL(userDetails.profilePicture))
              }
              sx={{ width: 300, height: 300, mb: 1 }}
            />
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                {userDetails?.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Primary Skill: {userDetails?.primarySkill}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h5" gutterBottom>
                  About Me
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {userDetails?.bio}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Contact Information
                </Typography>
                <Typography variant="body1">
                  Email: {userDetails?.email}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <div>
                <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
                  My Interests
                </Typography>
                <div>
                  {userDetails?.interests.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      sx={{
                        margin: 0.5,
                        backgroundColor: "#f0f0f0",
                        color: "#333",
                      }}
                    />
                  ))}
                </div>
              </div>
              {userDetails?.videos?.length > 0 && (
                <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
                  My Videos
                </Typography>
              )}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {userDetails?.videos.map((videoUrl, index) => (
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
                          video={{
                            id: extractPublicId(videoUrl),
                            link: videoUrl,
                          }}
                        />
                      </Box>
                    </CardActionArea>
                  </Card>
                ))}
              </Box>
              <Dialog
                open={open}
                onClose={handleClose}
                sx={{
                  "& .MuiDialog-paper": { width: "80%", maxHeight: "80vh" },
                }}
              >
                <VideoPlayer
                  id="demo-player"
                  publicId={extractPublicId(selectedVideo)}
                  autoPlay={true}
                  width="3840"
                  height="2160"
                />
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDetailPage;
