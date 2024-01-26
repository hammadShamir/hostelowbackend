const mongoose = require("mongoose");
const authSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },

    hostelName: {
        type: mongoose.Schema.Types.String,
        ref: "hostel",
    },

    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hostel",
    },

    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms",
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin", 'superadmin'],
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    profile: { type: String },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("auth", authSchema);
