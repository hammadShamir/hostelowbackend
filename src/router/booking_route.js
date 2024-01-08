const BookingRouter = require("express").Router();
const BookingController = require("../controller/booking_controller");
const { check } = require("express-validator");

BookingRouter.post(
    "/hostel/bookings",
    [
        check("hostelId", "Please Enter Hostel ID").not().isEmpty().trim().escape(),
        check("userId", "Please Enter User ID").not().isEmpty().trim().escape(),
        check("roomId", "Please Enter Room ID").not().isEmpty().trim().escape(),
        check("hostelname", "Please Enter Hostel Name").not().isEmpty().trim().escape(),
        check("totalAmount", "Please Enter Total Amount").not().isEmpty().isNumeric().toInt().trim().escape(),
        check("checkInDate", "Please Enter Check-in Date").not().isEmpty().isISO8601().toDate(),
        check("checkOutDate", "Please Enter Check-out Date").not().isEmpty().isISO8601().toDate(),
    ],
    BookingController.addBooking
);


BookingRouter.get("/hostel/bookings", BookingController.getBookingsByHostelOrUser);
module.exports = BookingRouter;
