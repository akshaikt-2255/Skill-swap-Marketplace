import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { getImageUrl } from "../../utils";

const ProfileHeader = ({user}) => {
  const followersCount = user?.followers?.length || 0;
  const followingCount = user?.following?.length || 0;
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
        src={
          user?.profilePicture &&
          (typeof user?.profilePicture === "string"
            ? getImageUrl(user.profilePicture)
            : URL.createObjectURL(user.profilePicture))
        }
        sx={{ width: 300, height: 300, mb: 1 }}
      />
      <Box sx={{ mt: 2, textAlign: "center" }}>
        <Typography
          variant="h4"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {user?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Primary Skill: {user?.primarySkill}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
          {followersCount} Followers
        </Typography>
        <Typography variant="subtitle1">
          {followingCount} Following
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
