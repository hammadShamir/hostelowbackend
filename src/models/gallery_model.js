const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema({
  hostelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hostel",
    required: true,
  },

  images: Array,

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("gallery", gallerySchema);
