import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Snackbar,
  SnackbarContent,
  IconButton
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerStyles.css";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../data/reducer/api/userThunk";

const CreateEventPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [link, setLink] = useState("");
  const [location, setLocation] = useState("");
  const [datetime, setDatetime] = useState(new Date());
  const [slots, setSlots] = useState("");
  const [image, setImage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({image})
    const formData = new FormData();
    formData.append("title",title);
    formData.append("userId", user?._id);
    formData.append("description", description);
    formData.append("online", isOnline);
    formData.append("link", link);
    formData.append("location", location);
    formData.append("datetime", datetime);
    formData.append("availableSlots", slots);
    formData.append("eventImage", image);

    dispatch(createEvent(formData))
      .unwrap()
      .then(() => {
        setTitle("");
        setDescription("");
        setIsOnline(true);
        setLink("");
        setLocation("");
        setDatetime(new Date());
        setSlots("");
        setImage(null);

        handleSnackbarOpen("Event created successfully");
      })
      .catch((error) => {
        console.error("Failed to create the event:", error);
        handleSnackbarOpen(error);
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create Group Event
        </Typography>
        <Box component="form" noValidate sx={{ mt: 2 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Event Title"
            name="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Event Description"
            name="description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isOnline}
                  onChange={(e) => setIsOnline(e.target.checked)}
                />
              }
              label="Online Event"
            />
          </FormGroup>
          {isOnline && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="link"
              label="Event Link"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          )}
          {!isOnline && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Event Location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          )}
          <Typography component="p" variant="body1" sx={{ mt: 2, mb: 1 }}>
            Date and Time
          </Typography>
          <DatePicker
            selected={datetime}
            onChange={(date) => setDatetime(date)}
            showTimeSelect
            dateFormat="Pp"
            wrapperClassName="datePicker"
            className="form-control"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="slots"
            label="Available Slots"
            type="number"
            name="slots"
            value={slots}
            onChange={(e) => setSlots(e.target.value)}
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Event Image
            <input
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Button>
          {image && (
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              {image.name}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Event
          </Button>
        </Box>
      </Box>
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

export default CreateEventPage;
