const mongoose = require("mongoose");
const hostelSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auths",
    required: true,
  },

  thumbnail: {
    type: String,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
  },
  desc: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: Array,
  location: {
    type: String,
    required: true,
  },

  discountPrice: {
    type: Number,
  },

  isPublished: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },

  reviewCount: {
    type: Number,
    default: 0,
  },

  policies: {
    type: [String],
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("hostel", hostelSchema);
