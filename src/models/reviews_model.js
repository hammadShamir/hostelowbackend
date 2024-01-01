const mongoose = require("mongoose");
const reviewsSchema = mongoose.Schema({
  hostelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hostel",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },

  noUser: {
    type: Number,
    required: true,
    default: 1,
  },
  cleanliness: {
    type: Number,
    required: true,
  },
  amenities: {
    type: Number,
    required: true,
  },
  location: {
    type: Number,
    required: true,
  },
  comfort: {
    type: Number,
    required: true,
  },
  wifi: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("reviews", reviewsSchema);
