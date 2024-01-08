const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    hostelId: {
        type: String,
        ref: 'hostel',
        required: true
    },
    hostelname: {
        type: String,
        ref: 'hostel',
        required: true
    },
    userId: {
        type: String,
        ref: 'auth',
        required: true
    },
    roomId: {
        type: String,
        ref: 'rooms',
        required: true
    },
    bookingDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Confirmed', 'Pending', 'Canceled'],
        default: 'Pending'
    }
});

module.exports = mongoose.model('bookings', bookingSchema);
