import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ProfileDetails = ({user}) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {user?.bio}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Contact Information
      </Typography>
      <Typography variant="body1">
        Email: {user?.email}
      </Typography>
    </Box>
  );
};

export default ProfileDetails;
