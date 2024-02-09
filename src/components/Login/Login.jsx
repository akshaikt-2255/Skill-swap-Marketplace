import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import "./Login.css"; 
import registerImg from '../../assets/register.png'; 

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
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
              Log in
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
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
