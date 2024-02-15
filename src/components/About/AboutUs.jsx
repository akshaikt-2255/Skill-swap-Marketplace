import "./AboutUs.css";
import ImageOne from "../../assets/About1.png";
import ImageTwo from "../../assets/About2.png";
import ImageThree from "../../assets/About3.png";
import { Typography } from "@mui/material";

const AboutUs = () => {
  return (
    <div className="about-us">
      <section className="intro-section">
        <Typography variant="h2" component="h2" className="header-color">
          About SkillSwap
        </Typography>
        <Typography paragraph>
          Welcome to SkillSwap, a vibrant community where passion for learning
          meets the power of teaching. Our platform is more than just an
          educational hub—it's a movement dedicated to democratizing knowledge
          and empowering individuals. We celebrate the diversity of skills and
          embrace the idea that everyone has something valuable to teach and
          learn. Join us in redefining the way skills are shared and embraced
          worldwide.
        </Typography>
      </section>

      <section className="image-content-section">
        <img src={ImageOne} alt="SkillSwap Meeting" className="about-image" />
        <div className="content">
          <Typography variant="h3" component="h2" className="header-color">
            Our Vision
          </Typography>
          <Typography paragraph>
            At SkillSwap, our vision is to revolutionize the way people approach
            learning. We believe in breaking down barriers to education by
            providing a platform where knowledge is accessible, and connections
            are made effortlessly. Our goal is to foster an environment where
            learning is not just a transaction but a journey of growth and
            shared experiences. With every skill exchanged, we come one step
            closer to a world where continuous learning and improvement is not
            just a dream but a daily reality.
          </Typography>
        </div>
      </section>

      <section className="content-image-section">
        <div className="content">
          <Typography variant="h3" component="h2" className="header-color">
            Community-Driven Learning
          </Typography>
          <Typography paragraph>
            Our community is the heart of SkillSwap. It's driven by passionate
            individuals who are not only experts in their fields but also
            advocates for collaborative growth. From casual hobbyists to
            seasoned professionals, our members bring a wealth of knowledge and
            experience to our collective table. Our platform is designed to
            nurture these connections, making it possible for everyone to find
            the support they need to succeed. Whether it's through local
            workshops or online discussions, we provide a space where every
            voice can be heard and every skill can shine.
          </Typography>
        </div>
        <img src={ImageTwo} alt="SkillSwap Workshop" className="about-image" />
      </section>

      <section className="image-content-section">
        <img
          src={ImageThree}
          alt="SkillSwap Online Platform"
          className="about-image"
        />
        <div className="content">
          <Typography variant="h3" component="h2" className="header-color">
            Join Us
          </Typography>
          <Typography paragraph>
            Are you ready to share your skills and learn something new?
            SkillSwap invites you to become part of a community that values
            knowledge exchange and personal growth. We're more than just a
            platform; we're a family of learners and teachers from all walks of
            life. By joining us, you're not just signing up for a service—you're
            becoming a part of a global movement that values the power of
            sharing knowledge. Let's embark on this journey together and see
            where it takes us. Your next great learning experience awaits!
          </Typography>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
