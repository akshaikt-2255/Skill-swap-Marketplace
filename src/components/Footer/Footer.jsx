import { Box, Container, Grid, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import './Footer.css'; 

const Footer = () => {
  return (
    <Box className="footer">
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom className="footerTitle">
              Your Account
            </Typography>
            <Link href="#" className="footerLink">Sign up</Link>
            <Link href="#" className="footerLink">Log in</Link>
            <Link href="#" className="footerLink">Help</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom className="footerTitle">
              Discover
            </Typography>
            <Link href="#" className="footerLink">skills</Link>
            <Link href="#" className="footerLink">Calendar</Link>
            <Link href="#" className="footerLink">Categories</Link>
            <Link href="#" className="footerLink">Cities</Link>
            <Link href="#" className="footerLink">Online Events</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom className="footerTitle">
              SkillSwap
            </Typography>
            <Link href="#" className="footerLink">About</Link>
            <Link href="#" className="footerLink">Blog</Link>
            <Link href="#" className="footerLink">Careers</Link>
            <Link href="#" className="footerLink">Apps</Link>
          </Grid>
        </Grid>
        <Box mt={3} mb={1} className="socialMedia" marginRight={2}>
          <Typography variant="body2" gutterBottom className="footerFollowUs" marginRight={2}>
            Follow us
          </Typography>
          <FacebookIcon className="footerIcon"/><TwitterIcon className="footerIcon"/><YouTubeIcon className="footerIcon"/><InstagramIcon className="footerIcon"/>
        </Box>
        <Box mt={1} className="legalLinks">
          <Link href="#" className="footerLink" marginRight={2}>Terms of Service</Link> | 
          <Link href="#" className="footerLink" marginLeft={2} marginRight={2}>Privacy Policy</Link> | 
          <Link href="#" className="footerLink" marginLeft={2} marginRight={2}>Cookie Settings</Link> | 
          <Link href="#" className="footerLink" marginLeft={2} marginRight={2}>Cookie Policy</Link> | 
          <Link href="#" className="footerLink" marginLeft={2} marginRight={2}>Help</Link>
        </Box>
        <Box mt={1} className="copyright">
          <Typography variant="body2" className="footerText">
            © 2024 SkillSwap
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
