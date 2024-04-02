import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, Box, Chip, Container, Grid, Typography } from "@mui/material";
import { getImageUrl } from "../../utils";

const UserDetailPage = () => {
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);

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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDetailPage;
