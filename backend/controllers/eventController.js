const Event = require("../models/eventModel")

// Create a new event
module.exports.addEvent = async (req, res) => {
    try {
    const { name, date, location, description} = req.body;
    const {userId } = req.user
    const newEvent = new Event({ name, date, location, description, userId });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
} catch (error) {
        res.status(500).json({
          message:error.message
        })
}
  }

module.exports.getEvents = async (req, res) => {
  try {
    const { userId } = req.user;
    const events = await Event.find({ userId });
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
    
  }
  }

module.exports.getEvent = async(req, res) => {
  try {
    const {id} = req.params
  
    const event = await Event.findById(id)
    res.status(200).json({event})
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}

  // Update an event by ID
module.exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, location, description } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(id, { name, date, location, description }, { new: true });
    res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
  }
  
  // Delete an event by ID
module.exports.deleteEvent =  async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
  }