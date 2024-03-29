import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Grid, TextField, Button, Typography, Paper, IconButton, InputAdornment,SnackbarContent,
  Snackbar, } from "@mui/material";
import { Visibility, VisibilityOff,Close } from "@mui/icons-material";
import { useDispatch } from 'react-redux';
import { createUser } from '../../data/reducer/api/userThunk'; // Adjust the import path as needed
import "./Register.css"; 
import registerImg from '../../assets/register.png';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      dispatch(createUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })).unwrap()
        .then((res) => {
          setIsError(false);
          handleSnackbarOpen('User registered successfully, please login');
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        })
        .catch((error) => {
          setIsError(true);
          handleSnackbarOpen(error)
          console.error("Registration Error:", error);
          setErrors({ form: error });
        });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={6} className="paper">
        <Grid container>
          <Grid item xs={12} sm={6} className="image-container">
            <img src={registerImg} alt="Register" className="image" />
          </Grid>
          <Grid item xs={12} sm={6} className="form-container">
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="email"
                label="Email Address"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item paddingTop={2}>
                  Already have an account? <Link to="/login">Log in</Link>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <SnackbarContent
          message={snackbarMessage}
          className={!isError ? "snack-positive" : "snack-negative"}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            >
              <Close fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </Container>
  );
};

export default Register;
