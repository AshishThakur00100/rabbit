const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// @route POST /api/subscriber
// @desc Subscribe a user to the newsletter
// @access Public
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  try {
   let subscriber = await Subscriber.findOne({ email });
   if (subscriber) {
      return res.status(400).json({ message: 'Already subscribed' });
    }
    // if email is not already subscribed, create a new subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;