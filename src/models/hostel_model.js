const mongoose = require("mongoose");
const hostelSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auths",
    required: true,
  },

  thumbnail: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("hostel", hostelSchema);
