const AmentityModel = require("../models/amentities_model");
const { validationResult } = require("express-validator");

const amentitiesController = {
  addOrUpdateAmenities: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .send({ error: "All fields are required" });
      }

      const { hostelId, ...amenities } = req.body;

      await AmentityModel.findOne({ hostelId })
        .then(async (amentity) => {
          if (!amentity) {
            await AmentityModel.create({ hostelId, ...amenities });
          } else {
            Object.assign(amentity, amenities);
            await amentity.save();
          }
          return res.status(200).send({ message: "Amenities Updated" });
        })
        .catch((err) => {
          return res.status(200).send({ error: "Data not valid" });
        });
    } catch (error) {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },
};

module.exports = amentitiesController;
