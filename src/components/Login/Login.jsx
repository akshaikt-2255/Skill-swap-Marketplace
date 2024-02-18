import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  SnackbarContent,
  Snackbar,
} from "@mui/material";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css";
import registerImg from "../../assets/register.png";
import { useDispatch } from "react-redux";
import { getUser } from "../../data/reducer/api/userThunk";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.username) tempErrors.username = "Username is required";
    if (!formData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const actionResult = await dispatch(getUser(formData));
      if (actionResult?.error) {
        const errorMessage = actionResult?.payload;
        setIsError(true);
        handleSnackbarOpen(errorMessage);
      } else {
        const user = actionResult.payload.username;
        setIsError(false);
        if (user) {
          handleSnackbarOpen("Logged in successfully");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={6} className="paper">
        <Grid container>
          <Grid item xs={12} sm={6} className="image-container">
            <img src={registerImg} alt="Login" className="login-image" />
          </Grid>
          <Grid item xs={12} sm={6} className="form-container">
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.form && (
                <Typography
                  color="error"
                  variant="body2"
                  style={{ marginTop: "10px" }}
                >
                  {errors.form}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
              >
                Log In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item paddingTop={2}>
                  Don't have an account? <Link to="/register">Sign up</Link>
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

export default Login;
