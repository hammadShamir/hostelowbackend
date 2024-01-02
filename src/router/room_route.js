const AmentitiesRouter = require("express").Router();
const RoomsController = require("../controller/rooms_controller");
const { check } = require("express-validator");
const { verifyAdminToken } = require("../helpers/jwt_helpers");

// POST ALL ROOMS for a Hostel
AmentitiesRouter.post(
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

module.exports = AmentitiesRouter;
