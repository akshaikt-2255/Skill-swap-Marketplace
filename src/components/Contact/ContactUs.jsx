import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
} from "@mui/material";

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  // Function to handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to validate form fields
  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is required.";
    }
    if (!values.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!values.message) {
      errors.message = "Message is required.";
    }
    return errors;
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(formValues);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      // Handle sending data to backend or further processing here
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mt: 4, mb: 4 }}
      >
        Contact Us
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              height: "100%",
            }}
          >
            <div>
              <Typography variant="h6" gutterBottom>
                Contact Details
              </Typography>
              <Typography>Email: skillswapmarketplace@gmail.com</Typography>
              <Typography>Phone: +1 (123) 456-7890</Typography>
              <Typography>Address: 123 Main Street, Waterloo, ON</Typography>
            </div>

            <div>
              <Typography variant="h6" gutterBottom>
                Office Hours
              </Typography>
              <Typography>Monday to Friday: 9:00 AM - 6:00 PM</Typography>
              <Typography>Saturday: 10:00 AM - 4:00 PM</Typography>
              <Typography>Sunday: Closed</Typography>
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          {!submitted ? (
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Send Us a Message
              </Typography>
              <form noValidate onSubmit={handleSubmit}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Your Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={formValues.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Your Email"
                  name="email"
                  autoComplete="email"
                  value={formValues.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{ mt: 3 }}
                />
                <TextField
                  fullWidth
                  id="subject"
                  label="Subject"
                  name="subject"
                  value={formValues.subject}
                  onChange={handleChange}
                  sx={{ mt: 3 }}
                />
                <TextField
                  required
                  fullWidth
                  id="message"
                  label="Message"
                  name="message"
                  multiline
                  rows={4}
                  value={formValues.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={errors.message}
                  sx={{ mt: 3 }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                >
                  Send Message
                </Button>
              </form>
            </Paper>
          ) : (
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Message Sent Successfully!
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Thank you for reaching out to us. We will get back to you as
                  soon as possible.
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Visit Our Office
        </Typography>
        <iframe
          title="location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2919.688284146384!2d-80.52494528452097!3d43.464257679127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf4bca3a9b599%3A0x7e4e760f1b7773b2!2sWaterloo%2C%20ON!5e0!3m2!1sen!2sca!4v1662617741376!5m2!1sen!2sca"
          width="100%"
          height="350"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
        ></iframe>
      </Box>
    </Container>
  );
};

export default ContactUs;
