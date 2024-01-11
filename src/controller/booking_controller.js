const BookingModel = require("../models/booking_model");
const { validationResult } = require("express-validator");



const bookingController = {
    // Booking API
    addBooking: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .send({ error: 'All fields are required' });
            } else {
                const { hostelId, hostelname, userId, roomId, bookingDate, checkInDate, checkOutDate, totalAmount, status } = req.body;
                const existingBooking = await BookingModel.findOne({
                    hostelId: hostelId,
                    userId: userId,
                    roomId: roomId
                });

                if (existingBooking) {
                    existingBooking.status = status;
                    await existingBooking.save();
                    return res.status(200).send(existingBooking);
                } else {
                    const newBooking = await BookingModel.create({
                        hostelId: hostelId,
                        hostelname: hostelname,
                        roomId: roomId,
                        bookingDate: bookingDate,
                        userId: userId,
                        checkInDate: checkInDate,
                        checkOutDate: checkOutDate,
                        totalAmount: totalAmount,
                        status: status,
                    });
                    return res.status(200).send({ message: newBooking });
                }
            }
        } catch (error) {
            return res.status(500).send({ error: "Internal Server Error" });
        }
    },


    getBookingsByHostelOrUser: async (req, res) => {
        try {
            const { hostelId, userId } = req.query;

            let bookings;
            if (hostelId) {
                bookings = await BookingModel.findOne({ hostelId: hostelId });
            } else if (userId) {
                bookings = await BookingModel.find({ userId: userId });
            }

            return res.status(200).send(bookings);
        } catch (error) {
            return res.status(500).send({ error: "Internal Server Error" });
        }
    }


}


module.exports = bookingController;
