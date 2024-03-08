import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';

const ProfileSkills = ({user}) => {
  return (
    <div>
      <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
        My Interests
      </Typography>
      <div>
        {user?.interests.map((skill, index) => (
          <Chip key={index} label={skill} sx={{ margin: 0.5, backgroundColor: '#f0f0f0', color: '#333' }} />
        ))}
      </div>
    </div>
  );
};

export default ProfileSkills;
