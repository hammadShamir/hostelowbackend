const mongoose = require("mongoose");
const otpSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now(),
        index: {
            expires: 300
        }
    }
}, { timestamps: true })

module.exports = mongoose.model("otp", otpSchema);