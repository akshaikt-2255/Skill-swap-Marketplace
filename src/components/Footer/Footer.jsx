import { Box, Container, Grid, Typography, Link } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./Footer.css";
import { useSelector } from "react-redux";

const Footer = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <footer>
    <Box className="footer">
      <Container maxWidth="lg">
        <Grid
          container
          spacing={5}
          sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            <Typography variant="h6" gutterBottom className="footerTitle">
              Your Account
            </Typography>
            {!user ? (
              <>
                <Link href="#" className="footerLink">
                  Sign up
                </Link>
                <Link href="#" className="footerLink">
                  Log in
                </Link>
              </>
            ) : (
              <>
                <Link href="#" className="footerLink">
                  Settings
                </Link>
                <Link href="#" className="footerLink">
                  Logout
                </Link>
              </>
            )}

            <Link href="#" className="footerLink">
              Help
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            <Typography variant="h6" gutterBottom className="footerTitle">
              Discover
            </Typography>
            <Link href="#" className="footerLink">
              Skills
            </Link>
            <Link href="#" className="footerLink">
              Calendar
            </Link>
            <Link href="#" className="footerLink">
              Categories
            </Link>
            <Link href="#" className="footerLink">
              Cities
            </Link>
            <Link href="#" className="footerLink">
              Online Events
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            <Typography variant="h6" gutterBottom className="footerTitle">
              SkillSwap
            </Typography>
            <Link href="/about" className="footerLink">
              About
            </Link>
            <Link href="#" className="footerLink">
              Blog
            </Link>
            <Link href="#" className="footerLink">
              Careers
            </Link>
            <Link href="#" className="footerLink">
              Apps
            </Link>
          </Grid>
        </Grid>
        <Box mt={3} mb={1} className="socialMedia" marginRight={2}>
          <Typography
            variant="body2"
            gutterBottom
            className="footerFollowUs"
            marginRight={2}
          >
            Follow us
          </Typography>
          <FacebookIcon className="footerIcon" />
          <TwitterIcon className="footerIcon" />
          <YouTubeIcon className="footerIcon" />
          <InstagramIcon className="footerIcon" />
        </Box>
        <Box mt={1} className="legalLinks">
          <Link href="#" className="footerLink" marginRight={2}>
            Terms of Service
          </Link>{" "}
          |
          <Link href="#" className="footerLink" marginLeft={2} marginRight={2}>
            Privacy Policy
          </Link>{" "}
          |
          <Link href="#" className="footerLink" marginLeft={2} marginRight={2}>
            Cookie Settings
          </Link>{" "}
          |
          <Link href="#" className="footerLink" marginLeft={2} marginRight={2}>
            Cookie Policy
          </Link>{" "}
          |
        </Box>
        <Box mt={1} className="copyright">
          <Typography variant="body2" className="footerText">
            © 2024 SkillSwap
          </Typography>
        </Box>
      </Container>
    </Box>
    </footer>
  );
};

export default Footer;
