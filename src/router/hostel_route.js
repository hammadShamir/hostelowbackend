const hostelRouter = require("express").Router();
const HostelController = require("../controller/hostel_controller");
const { verifyAdminToken } = require("../helpers/jwt_helpers");
const HostelModel = require("../models/hostel_model");
const { check } = require("express-validator");

// GET ALL HOSTELS
hostelRouter.get("/hostel/getHostels", HostelController.getHostels);

hostelRouter.get("/hostel/getHostelById", HostelController.getHostelByID);

// POST ALL HOSTELS
hostelRouter.post("/hostel/createhostel", verifyAdminToken,
  [
    check("thumbnail", "Please Enter thumbnail").not().isEmpty().trim().escape(),
    check("title", "Please Enter a Title").not().isEmpty().trim().escape()
      .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          HostelModel.findOne({ title: req.body.title })
            .then((title) => {
              if (title) {
                reject(new Error("Hostel name already Exist"));
              } else {
                resolve(true);
              }
            })
            .catch((err) => {
              reject(new Error(err));
            });
        });
      }),
    check("desc", "Please Enter a Description").not().isEmpty().trim().escape(),
    check("location", "Please Enter a Location").not().isEmpty().trim().escape(),
    check("price", "Please Enter Price").not().isEmpty().isNumeric().toInt().trim().escape(),
  ],
  HostelController.addHostel
);

module.exports = hostelRouter;
