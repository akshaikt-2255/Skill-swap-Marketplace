const express = require("express");
const eventRouter = express.Router();
const {
  createEvent,
  attendEvent,
  deleteEvent,
  getAllEvents,
  getEventsByHostId,
  getEventById,
  updateEvent,
  unAttendEvent,
  getEventsCount,
  saveRating
} = require("../controllers/eventController");
const upload = require("../upload");

eventRouter.post("/create", upload.single('eventImage'), createEvent);
eventRouter.post("/:eventId/attend", attendEvent);
eventRouter.get('/count', getEventsCount);
eventRouter.post('/:eventId/unattend', unAttendEvent);
eventRouter.delete("/:eventId", deleteEvent);
eventRouter.get("/", getAllEvents);
eventRouter.get('/host/:hostId', getEventsByHostId);
eventRouter.get("/:eventId", getEventById);
eventRouter.put("/:eventId", upload.single('eventImage'), updateEvent);
eventRouter.post('/:eventId/rate', saveRating);

module.exports = eventRouter;
