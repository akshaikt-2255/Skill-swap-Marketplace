import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ProfileDetails = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Contact Information
      </Typography>
      <Typography variant="body1">
        Email: john.doe@example.com
      </Typography>
    </Box>
  );
};

export default ProfileDetails;
