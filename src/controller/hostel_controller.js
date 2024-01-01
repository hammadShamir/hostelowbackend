const HostelModel = require("../models/hostel_model");
const AmentityModel = require("../models/amentities_model");
const ReviewsModel = require("../models/reviews_model");
const GalleryModel = require("../models/gallery_model");
const RoomModel = require("../models/room_model");
const { validationResult } = require("express-validator");

const hostelController = {
  // Add Hostel
  addHostel: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .send({ error: "All fields are required" });
      } else {
        const { thumbnail, title, desc, price, location, rating } = req.body;
        await HostelModel.create({
          userId: req.user.id,
          thumbnail: thumbnail,
          title: title,
          desc: desc,
          price: price,
          location: location,
          rating: rating,
        }).then((user) => {
          return res.status(200).send(user);
        });
      }
    } catch (error) {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },

  // GET ALL HOSTEL
  getHostels: async (req, res) => {
    try {
      const hostels = await HostelModel.find();
      let hostelsWithAmenities = [];

      for (const element of hostels) {
        const amenities = await AmentityModel.findOne({
          hostelId: element._id,
        });
        const hostelReviews = await ReviewsModel.findOne({
          hostelId: element._id,
        });

        const gallery = await GalleryModel.findOne({
          hostelId: element._id,
        });

        const rooms = await RoomModel.find({
          hostelId: element._id,
        });


        const roomsArray = rooms.map(room => ({
          type: room.type,
          price: room.price,
          beds: room.beds,
          description: room.description,
          amenities: room.amenities,
          availability: room.availability,
          images: room.images,
          occupancy: room.occupancy
        }));

        const hostelWithAmenities = {
          _id: element._id,
          thumbnail: element.thumbnail,
          title: element.title,
          desc: element.desc,
          price: element.price,
          location: element.location,
          rating: element.rating,
          date: element.date,
          amentities: amenities
            ? {
              freeWifi: amenities.freeWifi,
              privateBathroom: amenities.privateBathroom,
              freeParking: amenities.freeParking,
              helpDesk: amenities.helpDesk,
              airCondition: amenities.airCondition,
              keyAccess: amenities.keyAccess,
              transportation: amenities.transportation,
            }
            : null,
          reviews: hostelReviews
            ? {
              cleanliness: hostelReviews.cleanliness,
              amenities: hostelReviews.amenities,
              location: hostelReviews.location,
              comfort: hostelReviews.comfort,
              wifi: hostelReviews.wifi,
            }
            : null,
          rooms: roomsArray.length > 0 ? roomsArray : null,
          images: gallery ? gallery.images : null,
        };
        hostelsWithAmenities.push(hostelWithAmenities);
      }
      res.send({ hostels: hostelsWithAmenities });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
};

module.exports = hostelController;
