const express = require("express");
const eventRouter = express.Router();
const {
  createEvent,
  attendEvent,
  deleteEvent,
  getAllEvents,
  getEventsByHostId,
} = require("../controllers/eventController");
const upload = require("../upload");

eventRouter.post("/create", upload.single('eventImage'), createEvent);
eventRouter.post("/:eventId/attend", attendEvent);
eventRouter.delete("/:eventId", deleteEvent);
eventRouter.get("/", getAllEvents);
eventRouter.get('/host/:hostId', getEventsByHostId);

module.exports = eventRouter;
