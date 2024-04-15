const Event = require("../models/Events");
const User = require("../models/User");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      online,
      link,
      location,
      datetime,
      availableSlots,
      userId,
    } = req.body;
    let eventImage = "";

    if (req.file) {
      eventImage = req.file.path; // Use the file path from multer
    }
    const isOnline = online === "true" ? true : false;
    const loc = !isOnline ? location : null;
    const virtualLink = isOnline ? link : null;
    const newEvent = new Event({
      title,
      description,
      eventImage,
      host: userId,
      online,
      link: virtualLink,
      location: loc,
      datetime,
      availableSlots,
      attendees: [],
    });
    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: "Error creating event", error });
  }
};

const attendEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const {userId} = req.body;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    
    if (event.availableSlots <= event.attendees.length) {
      return res.status(400).json({ message: "No available slots" });
    }

    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: "User already attending" });
    }

    event.attendees.push(userId);
    event.availableSlots -= 1;
    await event.save();

    res.status(200).json({ message: "Successfully added to event", event });
  } catch (error) {
    res.status(500).json({ message: "Error attending event", error });
  }
};

const unAttendEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { userId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const attendeeIndex = event.attendees.indexOf(userId);
    if (attendeeIndex === -1) {
      return res.status(400).json({ message: "User not attending the event" });
    }

    event.attendees.splice(attendeeIndex, 1);
    event.availableSlots += 1;
    await event.save();

    res.status(200).json({ message: "Successfully removed from event", event });
  } catch (error) {
    res.status(500).json({ message: "Error unattending event", error });
  }
};


const deleteEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("host", "name")
      .populate("attendees", "name");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving events", error });
  }
};

const getEventsByHostId = async (req, res) => {
  try {
    const { hostId } = req.params;
    const events = await Event.find({ host: hostId })
      .populate("host", "name")
      .populate("attendees", "name");

    if (!events.length) {
      return res.status(404).json({ message: "No events found for this host" });
    }

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error retrieving events by host ID", error });
  }
};

const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId)
      .populate("host", "name")
      .populate("attendees", "name");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving event by ID", error });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const {
      title,
      description,
      online,
      link,
      location,
      datetime,
      availableSlots
    } = req.body;
    let eventImage = req.body?.eventImage || "";

    if (req.file) {
      eventImage = req.file.path;
    }

    const isOnline = online === "true" ? true : false;
    const loc = !isOnline ? location : null;
    const virtualLink = isOnline ? link : null;
    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        title,
        description,
        eventImage,
        online,
        link: virtualLink,
        location: loc,
        datetime,
        availableSlots,
      },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating event", error });
  }
};

const getEventsCount = async (req, res) => {
  try {
    const count = await Event.countDocuments({});
    res.status(200).json({ count });
  } catch (error) {
    console.error('Error fetching event count:', error);
    res.status(500).json({ message: "Error retrieving event count", error });
  }
};

module.exports = {
  createEvent,
  attendEvent,
  deleteEvent,
  getAllEvents,
  getEventsByHostId,
  getEventById,
  updateEvent,
  unAttendEvent,
  getEventsCount
};
