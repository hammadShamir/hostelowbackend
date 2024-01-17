const mongoose = require("mongoose");
const averageReviewsSchema = mongoose.Schema({
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hostel",
        required: true,
    },

    wifi: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    privateBathroom: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    bikeParking: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    helpDesk: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    airCondition: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    keyAccess: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    carParking: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    furnishedRooms: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    cctv: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    commonAreas: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    studyArea: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    laundry: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    cleaningServices: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    internet: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    bed: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    mattress: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    lunch: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    dinner: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    breakfast: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    generator: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    ups: {
        type: Number,
        default: 0,
        min: 0,
        //
    },
    geyser: {
        type: Number,
        default: 0,
        min: 0,
        //
    },


    date: {
        type: Date,
        default: Date.now,
    },
});



module.exports = mongoose.model("averagereviews", averageReviewsSchema);
