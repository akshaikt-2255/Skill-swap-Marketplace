const Event = require('../models/Events');
const User = require('../models/User');

const createEvent = async (req, res) => {
    try {
      const { title, description, online, link, location, datetime, availableSlots, userId } = req.body;
      let eventImage = "";
      
      if (req.file) {
        eventImage = req.file.path; // Use the file path from multer
      }
      const isOnline = online ===  "true" ? true : false ; 
      const loc = !isOnline ?  location : null
      const virtualLink = isOnline ? link : null
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
        attendees: [] 
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
    const userId = req.user._id;
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

    await event.save();
    
    res.status(200).json({ message: "Successfully added to event", event });
  } catch (error) {
    res.status(500).json({ message: "Error attending event", error });
  }
};

const deleteEvent = async (req, res) => {
    try {
      const { eventId } = req.params;
      const userId = req.user._id;
  
      const event = await Event.findById(eventId);

      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      if (event.host.toString() !== userId.toString()) {
        return res.status(403).json({ message: "User is not the host of the event" });
      }
  
      await event.remove();
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting event", error });
    }
  };
  
  const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find().populate('host', 'name').populate('attendees', 'name');
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving events", error });
    }
  };

  const getEventsByHostId = async (req, res) => {
    try {
        const { hostId } = req.params; 
        const events = await Event.find({ host: hostId }).populate('host', 'name').populate('attendees', 'name');

        if (!events.length) {
            return res.status(404).json({ message: "No events found for this host" });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving events by host ID", error });
    }
};

  
  module.exports = {
    createEvent,
    attendEvent,
    deleteEvent,
    getAllEvents,
    getEventsByHostId
  };
