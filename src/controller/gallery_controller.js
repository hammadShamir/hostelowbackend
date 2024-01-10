const GalleryModel = require("../models/gallery_model");
const { validationResult } = require("express-validator");

const galleryController = {
  // Add Gallery
  addGallery: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .send({ error: "All fields are required" });
      } else {
        const { hostelId, img0, img1, img2, img3, img4, others } = req.body;
        const gallery = await GalleryModel.findOne({ hostelId });
        if (gallery) {
          updateGallery = await GalleryModel.updateMany({ hostelId: hostelId }, {
            img0: img0,
            img1: img1,
            img2: img2,
            img3: img3,
            img4: img4,
            others: others
          })
          if (updateGallery) {
            res.status(200).send({ message: "Gallery Updated Successfully" })
          }
        } else {
          createGallery = await GalleryModel.create({
            hostelId: hostelId,
            img0: img0,
            img1: img1,
            img2: img2,
            img3: img3,
            img4: img4,
            others: others
          })
          if (createGallery) {
            res.status(200).send({ message: "Gallery Created Successfully" })
          }
        }
      }
    } catch (error) {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },
};

module.exports = galleryController;
