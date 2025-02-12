const express = require('express');
const router = express.Router();
const Event = require('../model/event.model.js');
const authMiddleware = require('../middleware/auth.js');

// Route for getting all events (with pagination) - accessible to all users
router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const events = await Event.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalEvents = await Event.countDocuments();

    res.json({
      events,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalEvents / limit),
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error getting events' });
  }
});

// Route for getting all events excluding user's own (for logged-in users)
router.get('/filtered', authMiddleware, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const userId = req.user._id;

  try {
    const events = await Event.find({ host: { $ne: userId } })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalEvents = await Event.countDocuments({ host: { $ne: userId } });

    res.json({
      events,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalEvents / limit),
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error getting events' });
  }
});

// Route for getting all events of the logged-in user
router.get('/my-events', authMiddleware, async (req, res) => {
  try {
    const userEvents = await Event.find({ host: req.user._id });
    res.json(userEvents);
  } catch (err) {
    res.status(500).json({ msg: 'Error getting user events' });
  }
});

// Route for creating an event (Authenticated Users Only)
router.post('/', authMiddleware, async (req, res) => {
    const { name, description, date, location, maxLimit } = req.body;
    const userId = req.user._id; 
  
    try {
      if (!name || !description || !date || !location || !maxLimit) {
        return res.status(400).json({ msg: "All fields are required" });
      }
  
      const event = await Event.create({
        name,
        description,
        date,
        location,
        maxLimit,
        host: userId,
      });
  
      res.json(event);
    } catch (err) {
    //   console.error('Error creating event:', err); 
      res.status(500).json({ msg: 'Error creating event' });
    }
  });
  

// Route to update an event (Only the owner can update)
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, description, date, location, maxLimit } = req.body;

  try {
    const event = await Event.findOne({ _id: id, host: req.user._id });
    if (!event) {
      return res.status(403).json({ msg: 'Unauthorized to update this event' });
    }

    event.name = name || event.name;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.maxLimit = maxLimit || event.maxLimit;
    await event.save();

    res.json(event);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating event' });
  }
});

// Route to delete an event (Only the owner can delete)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findOneAndDelete({ _id: id, host: req.user._id });

    if (!event) {
      return res.status(403).json({ msg: 'Unauthorized or event not found' });
    }

    res.json({ msg: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting event' });
  }
});

module.exports = router;
