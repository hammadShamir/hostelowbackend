const mongoose = require("mongoose");

const ticketIssueSchema = mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auths",
        type: String,
        required: true,
    },

    userId: {
        type: String,
        ref: 'auths',
        required: true
    },

    hostelId: {
        type: String,
        ref: 'hostel',
        required: true
    },

    roomId: {
        type: String,
        ref: 'rooms',
        required: true
    },

    ticketIssue: {
        type: String,
        trim: true,
        required: true,
    },

    status: {
        type: String,
        enum: ["draft", "open", "recieved", "working", "hold", "resolved"],
        default: "open",
    },
});

const TicketIssueModel = mongoose.model("TicketIssue", ticketIssueSchema);

module.exports = TicketIssueModel;