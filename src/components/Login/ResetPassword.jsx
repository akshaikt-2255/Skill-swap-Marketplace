import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar,
  SnackbarContent,
  IconButton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { getUsernameByEmail } from "../../data/reducer/api/apiRequest";
import { updateUser } from "../../data/reducer/api/userThunk";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || { email: "" };
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email) {
      getUsernameByEmail(email)
        .then(({username}) => setUsername(username))
        .catch((error) => {
          console.error("Failed to fetch username", error);
        });
    }
  }, [email]);
  
  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSaveChanges = async () => {
    if (newPassword !== rePassword) {
      setRePasswordError("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("newPassword", newPassword);
    formData.append("username", username);

    try {
      const result = await dispatch(updateUser(formData));
      if (result?.payload) {
        handleSnackbarOpen(result?.payload?.message);
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } else {
        handleSnackbarOpen("An unknown error occurred.");
      }
    } catch (error) {
      handleSnackbarOpen("Failed to update password.");
      console.error("Error updating password:", error);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Reset Password
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        sx={{ maxWidth: "500px", width: "100%" }}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Re-Type New Password"
        type="password"
        value={rePassword}
        onChange={(e) => setRePassword(e.target.value)}
        error={rePasswordError.length > 0}
        helperText={rePasswordError}
        sx={{ maxWidth: "500px", width: "100%" }}
      />
      <Button
        style={{ backgroundColor: "#23B0BE", color: "#FFF" }}
        onClick={handleSaveChanges}
        sx={{ mt: 2, maxWidth: "500px", width: "100%" }}
      >
        RESET
      </Button>
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
    </Box>
  );
};

export default ResetPassword;
