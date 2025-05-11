const mongoose = require('mongoose');
const { estimatedDocumentCount } = require('./Checkout');

const subscriberSchema = new mongoose.Schema(
  {

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('Subscriber', subscriberSchema);
// Compare this snippet from backend/models/Checkout.js: