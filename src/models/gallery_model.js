const mongoose = require("mongoose");

const gallerySchema = mongoose.Schema({
  hostelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hostel",
    required: true,
  },
  img0: {
    type: String,
  },
  img1: {
    type: String,
  },
  img2: {
    type: String,
  },
  img3: {
    type: String,
  },
  img4: {
    type: String,
  },
  
  others: Array,

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("gallery", gallerySchema);
