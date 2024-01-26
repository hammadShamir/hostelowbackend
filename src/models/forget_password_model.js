const mongoose = require("mongoose");
const forgetSchema = mongoose.Schema({

    email: {
        type: mongoose.Schema.Types.String,
        ref: "auth",
        required: true,
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("forgetpassword", forgetSchema);
