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
    default: 0,
  },
  wifi: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  privateBathroom: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  bikeParking: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  helpDesk: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  airCondition: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  keyAccess: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  carParking: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  furnishedRooms: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  cctv: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  commonAreas: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  studyArea: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  laundry: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  cleaningServices: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  internet: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  bed: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  mattress: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  lunch: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  dinner: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  breakfast: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  generator: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  ups: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },
  geyser: {
    type: Number,
    default: 0,
    min: 0,
    max: 10
  },

  overallRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 10,
  },

  overallReviews: {
    wifi: { type: Number },
    privateBathroom: { type: Number },
    bikeParking: { type: Number },
    helpDesk: { type: Number },
    airCondition: { type: Number },
    keyAccess: { type: Number },
    carParking: { type: Number },
    furnishedRooms: { type: Number },
    cctv: { type: Number },
    commonAreas: { type: Number },
    studyArea: { type: Number },
    laundry: { type: Number },
    cleaningServices: { type: Number },
    internet: { type: Number },
    bed: { type: Number },
    mattress: { type: Number },
    lunch: { type: Number },
    dinner: { type: Number },
    breakfast: { type: Number },
    generator: { type: Number },
    ups: { type: Number },
    geyser: { type: Number },

  },


  date: {
    type: Date,
    default: Date.now,
  },
});



module.exports = mongoose.model("reviews", reviewsSchema);
