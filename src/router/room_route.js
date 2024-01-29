const RoomRouter = require("express").Router();
const RoomsController = require("../controller/rooms_controller");
const { check } = require("express-validator");
const { verifyAdminToken } = require("../helpers/jwt_helpers");


RoomRouter.get('/hostel/allRooms/:hostelId', RoomsController.getAllRoomsByHostelId);
RoomRouter.get('/hostel/rooms/:roomId', RoomsController.getAllRoomsByRoomId);
// RoomRouter.get('/hostel/viewRooms/:hostelId', RoomsController.getAllRoomsByHostelId);
RoomRouter.post('/hostel/updateRoom', RoomsController.updateRoomByID);
RoomRouter.delete('/hostel/deleteRoom', RoomsController.deleteRoomById);



// POST ALL ROOMS for a Hostel
RoomRouter.post(
    "/hostel/addRooms",
    verifyAdminToken,
    [
        check("hostelId", "Please Enter Hostel ID").not().isEmpty().trim().escape(),
        check("type", "Please Enter Room Type").not().isEmpty().trim().escape(),

    ],
    RoomsController.addOrUpdateRooms
);



module.exports = RoomRouter;
