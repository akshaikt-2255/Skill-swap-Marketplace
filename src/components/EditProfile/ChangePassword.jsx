import  {  useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { checkUserPasswordThunk, updateUser } from "../../data/reducer/api/userThunk";

const UpdatePassword = ({  handleSnackBarOpen }) => {
    const user = useSelector((state) => state.user.user);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const dispatch = useDispatch();

  const handleSaveChanges = async () => {
    
    if (newPassword !== rePassword) {
      setRePasswordError("Passwords do not match.");
      return;
    }
    const result = await dispatch(
      checkUserPasswordThunk({ username: user?.user?.username, password: currentPwd })
    );
    if (result?.payload?.isPasswordCorrect) {
      const formData = new FormData();
      formData.append("newPassword", newPassword);
      formData.append("username", user?.user?.username);
      const result = await dispatch(updateUser(formData));
      if (result?.payload) {
        console.log("here", result.payload);
        handleSnackBarOpen(result?.payload?.message);
        setCurrentPwd("");
        setNewPassword("")
        setRePassword("")
      }
    } else {
        handleSnackBarOpen("Current Password is incorrect", true);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        fullWidth
        margin="normal"
        label="Current Password"
        type="password"
        value={currentPwd}
        onChange={(e) => setCurrentPwd(e.target.value)}
        error={currentPasswordError.length > 0}
        helperText={currentPasswordError}
      />
      <TextField
        fullWidth
        margin="normal"
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
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
      />
      <Button
        variant="contained"
        className="btn-save"
        onClick={handleSaveChanges}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default UpdatePassword;
