import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import profilePicture from "../../assets/profile.jpg";
import { Button } from "@mui/material";

const ProfileHeader = () => {
  return (
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
        src={profilePicture}
        sx={{ width: 300, height: 300, mb: 1 }}
      />
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          John Doe
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          Web Developer
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Primary Skill: React
        </Typography>
      </Box>
      <Link
        to="/editprofile"
        style={{ textDecoration: "none", marginTop: "30px" }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="submit"
        >
          Edit Profile
        </Button>
      </Link>
    </Box>
  );
};

export default ProfileHeader;
