import { useState, useEffect } from "react";
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
  IconButton,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerStyles.css";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getEventById, updateEvent } from "../../data/reducer/api/userThunk";
import { useNavigate, useParams } from "react-router-dom";

const EditEventPage = () => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [eventDetails, setEventDetails] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await dispatch(getEventById(eventId));
        setEventDetails(response.payload);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [dispatch, eventId]);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!eventId) {
      console.error("Event ID is undefined or null");
      // Handle the error or return early
      return;
    }
  
    const formData = new FormData();
    formData.append("title", eventDetails.title);
    formData.append("userId", user?._id);
    formData.append("description", eventDetails.description);
    formData.append("online", eventDetails.online);
    formData.append("link", eventDetails.link);
    formData.append("location", eventDetails.location);
    formData.append("datetime", eventDetails.datetime);
    formData.append("availableSlots", eventDetails.availableSlots);
    formData.append("eventImage", eventDetails.eventImage);
    dispatch(updateEvent({eventId, formData}))
      .unwrap()
      .then(() => {
        handleSnackbarOpen("Event updated successfully");
        navigate('/myEvents');
      })
      .catch((error) => {
        console.error("Failed to update the event:", error);
        handleSnackbarOpen(error);
      });
  };
  

  const handleInputChange = (fieldName, value) => {
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [fieldName]: value,
    }));
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
          Edit Event
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
            value={eventDetails?.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
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
            value={eventDetails?.description || ""}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={eventDetails?.online || false}
                  onChange={(e) => handleInputChange("online", e.target.checked)}
                />
              }
              label="Online Event"
            />
          </FormGroup>
          {eventDetails?.online && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="link"
              label="Event Link"
              name="link"
              value={eventDetails?.link || ""}
              onChange={(e) => handleInputChange("link", e.target.value)}
            />
          )}
          {!eventDetails?.online && (
            <TextField
              margin="normal"
              required
              fullWidth
              id="location"
              label="Event Location"
              name="location"
              value={eventDetails?.location|| ""}
              onChange={(e) => handleInputChange("location", e.target.value)}
            />
          )}
          <Typography component="p" variant="body1" sx={{ mt: 2, mb: 1 }}>
            Date and Time
          </Typography>
          <DatePicker
            selected={eventDetails?.datetime || new Date()}
            onChange={(date) => handleInputChange("datetime", date)}
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
            value={eventDetails?.availableSlots || ""}
            onChange={(e) => handleInputChange("availableSlots", e.target.value)}
          />
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Event Image
            <input
              type="file"
              hidden
              onChange={(e) => handleInputChange("eventImage", e.target.files[0])}
            />
          </Button>
          {eventDetails?.eventImage && (
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              {eventDetails?.eventImage?.name}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Event
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

export default EditEventPage;
