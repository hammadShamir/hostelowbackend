const mongoose = require("mongoose");

const AmentittiesSchema = new mongoose.Schema({
  hostelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hostel",
    required: true,
  },
  wifi: {
    type: Boolean,
    default: false,
  },
  privateBathroom: {
    type: Boolean,
    default: false,
  },
  bikeParking: {
    type: Boolean,
    default: false,
  },
  helpDesk: {
    type: Boolean,
    default: false,
  },
  airCondition: {
    type: Boolean,
    default: false,
  },
  keyAccess: {
    type: Boolean,
    default: false,
  },
  carParking: {
    type: Boolean,
    default: false,
  },
  furnishedRooms: {
    type: Boolean,
    default: false,
  },
  cctv: {
    type: Boolean,
    default: false,
  },
  commonAreas: {
    type: Boolean,
    default: false,
  },
  studyArea: {
    type: Boolean,
    default: false,
  },
  laundry: {
    type: Boolean,
    default: false,
  },
  cleaningServices: {
    type: Boolean,
    default: false,
  },
  internet: {
    type: Boolean,
    default: false,
  },
  bed: {
    type: Boolean,
    default: false,
  },
  mattress: {
    type: Boolean,
    default: false,
  },
  lunch: {
    type: Boolean,
    default: false,
  },
  dinner: {
    type: Boolean,
    default: false,
  },
  breakfast: {
    type: Boolean,
    default: false,
  },
  generator: {
    type: Boolean,
    default: false,
  },
  ups: {
    type: Boolean,
    default: false,
  },
  geyser: {
    type: Boolean,
    default: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("amentity", AmentittiesSchema);
