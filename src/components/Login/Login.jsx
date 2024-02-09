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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css";
import registerImg from '../../assets/register.png';
import { useDispatch } from "react-redux";
import { getUser } from "../../data/reducer/api/userThunk";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
      try {
        const actionResult = await dispatch(getUser(formData));
        const user = actionResult.payload.username;
        if (user) {
          navigate('/');
        }
      } catch (error) {
        console.error("Failed to login: ", error);
        setErrors({ form: "Failed to login, please try again" });
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
                <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>
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
    </Container>
  );
};

export default Login;
