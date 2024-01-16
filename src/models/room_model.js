const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hostel",
        required: true,
    },
    type: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    beds: {
        type: Number,
        required: true,
    },

    desc: { type: String },

    images: Array,

    amenitities: Array,

    availability: {
        type: Number,
        default: true,
    },

    occupancy: {
        type: Number,
        default: true,
    },

    discountPrice: {
        type: Number,
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("rooms", RoomSchema);
