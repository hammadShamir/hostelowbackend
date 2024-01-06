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
    admin: {
        type: Boolean,
        required: true
    },

    profile: { type: String },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("auth", authSchema);