const AmentitiesRouter = require("express").Router();
const AmentitiesController = require("../controller/amentities_controller");
const { check } = require("express-validator");
const { verifyAdminToken } = require("../helpers/jwt_helpers");

// POST ALL AMENITIES for a Hostel
AmentitiesRouter.post(
  "/hostel/addAmenities",
  verifyAdminToken,
  [
    check("hostelId", "Please Enter Hostel ID").not().isEmpty().trim().escape(),
    check("wifi", "Please provide a valid value for Free Wifi").isBoolean().optional(),
    check("privateBathroom", "Please provide a valid value for Private Bathroom").isBoolean().optional(),
    check("bikeParking", "Please provide a valid value for Bike Parking").isBoolean().optional(),
    check("helpDesk", "Please provide a valid value for Help Desk").isBoolean().optional(),
    check("airCondition", "Please provide a valid value for Air Condition").isBoolean().optional(),
    check("carParking", "Please provide a valid value for Car Parking").isBoolean().optional(),
    check("keyAccess", "Please provide a valid value for Key Access").isBoolean().optional(),
    check("furnishedRooms", "Please provide a valid value for Furnished Rooms").isBoolean().optional(),
    check("cctv", "Please provide a valid value for CCTV").isBoolean().optional(),
    check("commonAreas", "Please provide a valid value for Common Areas").isBoolean().optional(),
    check("studyArea", "Please provide a valid value for Study Area").isBoolean().optional(),
    check("laundry", "Please provide a valid value for Laundry").isBoolean().optional(),
    check("cleaningServices", "Please provide a valid value for Cleaning Services").isBoolean().optional(),
    check("internet", "Please provide a valid value for Internet").isBoolean().optional(),
    check("bed", "Please provide a valid value for Bed").isBoolean().optional(),
    check("mattress", "Please provide a valid value for Mattress").isBoolean().optional(),
    check("lunch", "Please provide a valid value for Lunch").isBoolean().optional(),
    check("dinner", "Please provide a valid value for Dinner").isBoolean().optional(),
    check("breakfast", "Please provide a valid value for Breakfast").isBoolean().optional(),
    check("generator", "Please provide a valid value for Generator").isBoolean().optional(),
    check("ups", "Please provide a valid value for UPS").isBoolean().optional(),
    check("geyser", "Please provide a valid value for Geyser").isBoolean().optional(),
  ],
  AmentitiesController.addOrUpdateAmenities
);

module.exports = AmentitiesRouter;
