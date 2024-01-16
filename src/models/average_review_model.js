const mongoose = require("mongoose");
const averageReviewsSchema = mongoose.Schema({
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hostel",
        required: true,
    },

    wifi: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    privateBathroom: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    bikeParking: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    helpDesk: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    airCondition: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    keyAccess: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    carParking: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    furnishedRooms: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    cctv: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    commonAreas: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    studyArea: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    laundry: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    cleaningServices: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    internet: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    bed: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    mattress: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    lunch: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    dinner: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    breakfast: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    generator: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    ups: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },
    geyser: {
        type: Number,
        default: null,
        min: 0,
        max: 10
    },


    date: {
        type: Date,
        default: Date.now,
    },
});



module.exports = mongoose.model("averagereviews", averageReviewsSchema);
