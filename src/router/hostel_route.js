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
    check("location", "Please Enter a Location").not().isEmpty().trim().escape(),
    check("price", "Please Enter Price").not().isEmpty().isNumeric().toInt().trim().escape(),
  ],
  HostelController.addHostel
);

// POST ALL HOSTELS
hostelRouter.post("/hostel/updateHostel", verifyAdminToken,
  [
    check("hostelId", "Please provide hostelId").not().isEmpty().trim().escape(),

  ],
  HostelController.updateHostel
);

// POST ALL HOSTELS
hostelRouter.delete("/hostel/deleteHostel",
  [
    check("hostelId", "Please provide hostelId").not().isEmpty().trim().escape(),
  ],
  HostelController.deleteHostel
);

module.exports = hostelRouter;
