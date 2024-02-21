import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';
import ProfileSkills from './ProfileSkills';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import './ProfilePage.css'

const ProfilePage = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <ProfileHeader />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ProfileDetails />
            </Grid>
            <Grid item xs={12}>
              <ProfileSkills />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
