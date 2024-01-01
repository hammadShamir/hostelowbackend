const mongoose = require("mongoose");

const AmentittiesSchema = new mongoose.Schema({
  hostelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hostel",
    required: true,
  },
  freeWifi: {
    type: Boolean,
    default: false,
  },
  privateBathroom: {
    type: Boolean,
    default: false,
  },
  freeParking: {
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
  transportation: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("amentity", AmentittiesSchema);
