const RoomRouter = require("express").Router();
const RoomsController = require("../controller/rooms_controller");
const { check } = require("express-validator");
const { verifyAdminToken } = require("../helpers/jwt_helpers");


RoomRouter.get('/hostel/allRooms/:hostelId', RoomsController.getAllRoomsByHostelId);
RoomRouter.post('/hostel/updateRoom', RoomsController.updateRoomByID);

// POST ALL ROOMS for a Hostel
RoomRouter.post(
    "/hostel/addRooms",
    verifyAdminToken,
    [
        check("hostelId", "Please Enter Hostel ID").not().isEmpty().trim().escape(),
        check("type", "Please Enter Room Type").not().isEmpty().trim().escape(),
        check("price", "Please Enter Price").not().isEmpty().isNumeric().toInt().trim().escape(),
        check("beds", "Please Enter beds").not().isEmpty().isNumeric().toInt().trim().escape(),
        check("description", "Please Enter Room description").not().isEmpty().trim().escape(),
        check("images", "Please provide valid Images").isArray(),
        check("amenitities", "Please provide valid Amentities").isArray(),
        check("availability", "Please enter availability").not().isEmpty().isNumeric().toInt().trim().escape(),
        check("occupancy", "Please enter occupancy").not().isEmpty().isNumeric().toInt().trim().escape(),
    ],
    RoomsController.addOrUpdateRooms
);



module.exports = RoomRouter;
