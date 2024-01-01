const galleryRouter = require("express").Router();
const GalleryController = require("../controller/gallery_controller");
const { check } = require("express-validator");
const getAdmin = require("../middleware/getAdmin");

// POST Gallery Images
galleryRouter.post(
  "/hostel/addGallery",
  getAdmin,
  [
    check("hostelId", "Please Enter Hostel ID").not().isEmpty().trim().escape(),
    check("images", "Please provide valid Images").isArray(),
  ],
  GalleryController.addGallery
);

module.exports = galleryRouter;
