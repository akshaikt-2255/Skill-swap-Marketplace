import ProfileHeader from './ProfileHeader';
import ProfileDetails from './ProfileDetails';
import ProfileSkills from './ProfileSkills';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import './ProfilePage.css'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);

  useEffect(() => {

  },[])
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <ProfileHeader user={user?.user} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ProfileDetails user={user?.user}/>
            </Grid>
            <Grid item xs={12}>
              <ProfileSkills user={user?.user}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
