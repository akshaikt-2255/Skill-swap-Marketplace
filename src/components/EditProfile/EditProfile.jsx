import { useState, useEffect } from "react";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Avatar,
  Snackbar,
  SnackbarContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PhotoCamera, Close, AccountCircle, VpnKey } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { updateUser } from "../../data/reducer/api/userThunk";
import UpdatePassword from "./ChangePassword";
import { useNavigate } from "react-router-dom";
const allInterests = ["music", "sports", "movies", "technology", "travel"];

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const username = localStorage.getItem("username");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [profile, setProfile] = useState({
    image: "",
    name: "",
    email: "",
    bio: "",
    primarySkill: "",
  });
  const [availableInterests, setAvailableInterests] = useState(allInterests);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const updatedAllInterests = allInterests.filter(
      (interest) => !selectedInterests.includes(interest)
    );
    setAvailableInterests(updatedAllInterests);
  }, [selectedInterests]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setProfile({ ...profile, image: file });
    } else {
      setProfile({ ...profile, [e.target.name]: e.target.value });
    }
  };

  const handleSnackbarOpen = (message, isError) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
    setIsError(!!isError);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleInterestAdd = (event) => {
    const newInterest = event.target.value;
    if (!selectedInterests.includes(newInterest) && newInterest) {
      setSelectedInterests((prevSelectedInterests) => [
        ...prevSelectedInterests,
        newInterest,
      ]);
    }
  };

  const handleDeleteChip = (interestToRemove) => {
    setSelectedInterests((currentInterests) =>
      currentInterests.filter((interest) => interest !== interestToRemove)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("username", username);
    formData.append("email", profile.email);
    formData.append("primarySkill", profile.primarySkill);
    formData.append("bio", profile.bio);
    formData.append("gender", profile.gender);
    formData.append("profilePicture", profile.image);
    formData.append("interests", selectedInterests);

    const result = await dispatch(updateUser(formData));
    if (result?.payload) {
      handleSnackbarOpen(result?.payload?.message);
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      <Tabs
        orientation={isMobile ? "horizontal" : "vertical"}
        variant="scrollable"
        scrollButtons="auto"
        value={value}
        onChange={handleChange}
        sx={{
          borderRight: 1,
          borderColor: "divider",
          [theme.breakpoints.down("sm")]: {
            borderBottom: 1,
            borderRight: "none",
          },
        }}
      >
        <Tab
          icon={isMobile ? <AccountCircle /> : null}
          label={!isMobile ? "Edit Profile" : ""}
        />
        <Tab
          icon={isMobile ? <VpnKey /> : null}
          label={!isMobile ? "Change Password" : ""}
        />
      </Tabs>

      {value === 0 && (
        <Box sx={{ p: 3, width: isMobile ? "100%" : "calc(100% - 160px)" }}>
          <Box>
            <Typography variant="h5">Edit Profile</Typography>
            {profile.image ? (
              <Avatar
                alt="Profile Picture"
                src={
                  profile.image &&
                  (typeof profile.image === "string"
                    ? ""
                    : URL.createObjectURL(profile.image))
                }
                sx={{ width: 100, height: 100 }}
              />
            ) : (
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  name="image"
                  onChange={handleInputChange}
                />
                <PhotoCamera />
              </IconButton>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              value={profile.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={profile.email}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="normal">
              <TextField
                id="primarySkill"
                label="Primary Skill"
                name="primarySkill"
                value={profile.primarySkill}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <Typography variant="subtitle1">Gender</Typography>
              <RadioGroup
                row
                name="gender"
                value={profile.gender}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Bio
              </Typography>
              <textarea
                id="bio"
                name="bio"
                rows="4"
                style={{
                  width: "100%",
                  padding: "18.5px 14px",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                  fontSize: "1rem",
                  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                }}
                value={profile.bio}
                onChange={handleInputChange}
              ></textarea>
            </FormControl>

            <FormControl fullWidth>
              <Typography variant="subtitle1">Interests</Typography>
              <Select
                value=""
                onChange={handleInterestAdd}
                displayEmpty
                renderValue={() => "Select interest"}
              >
                {availableInterests.map((interest) => (
                  <MenuItem key={interest} value={interest}>
                    {interest}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 2 }}>
              {selectedInterests.map((interest) => (
                <Chip
                  key={interest}
                  label={interest}
                  onDelete={() => handleDeleteChip(interest)}
                  deleteIcon={<Close />}
                />
              ))}
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3 }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      )}

      <Box sx={{ p: 3 }}>
        {value === 1 && (
          <UpdatePassword handleSnackBarOpen={handleSnackbarOpen} />
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{ backgroundColor: `${isError ? "red" : "green"}` }}
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

export default EditProfile;
