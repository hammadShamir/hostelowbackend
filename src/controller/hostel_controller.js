const HostelModel = require("../models/hostel_model");
const AmentityModel = require("../models/amentities_model");
const ReviewsModel = require("../models/reviews_model");
const RoomModel = require("../models/room_model");
const GalleryModel = require("../models/gallery_model");
const { validationResult } = require("express-validator");

const hostelController = {
  // Add Hostel
  addHostel: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .send({ error: errors.array().map((err) => err.msg)[0] });
      } else {
        const { thumbnail, title, desc, price, location, rating, tags, discountPrice, isPublished } = req.body;
        const slug = title.replaceAll(" ", "-");
        await HostelModel.create({
          userId: req.payload.aud,
          thumbnail: thumbnail,
          title: title,
          desc: desc,
          price: price,
          location: location,
          rating: rating,
          slug: slug,
          tags: tags,
          isPublished: isPublished,
          discountPrice: discountPrice,
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
          userId: element.userId,
          title: element.title,
          desc: element.desc,
          price: element.price,
          location: element.location,
          rating: element.rating,
          date: element.date,
          discountPrice: element.discountPrice,
          isPublished: element.isPublished,
          amentities: amenities
            ? amenities
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
          thumbnail: element.thumbnail,
        };
        hostelsWithAmenities.push(hostelWithAmenities);
      }
      res.send({ hostels: hostelsWithAmenities });
    } catch (error) {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },
  getHostelByID: async (req, res) => {
    try {
      const id = req.query.id;
      const hostel = await HostelModel.findOne({ _id: id });
      if (!hostel) {
        res.status(400).send({ error: "Result Not Found" })
      } else {
        const amenities = await AmentityModel.findOne({
          hostelId: hostel._id,
        });
        const hostelReviews = await ReviewsModel.findOne({
          hostelId: hostel._id,
        });
        const rooms = await RoomModel.find({
          hostelId: hostel._id,
        });
        const gallery = await GalleryModel.findOne({
          hostelId: hostel._id,
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
        const hostelData = {
          _id: hostel._id,
          userId: hostel.userId,
          title: hostel.title,
          desc: hostel.desc,
          price: hostel.price,
          location: hostel.location,
          rating: hostel.rating,
          date: hostel.date,
          discountPrice: hostel.discountPrice,
          isPublished: hostel.isPublished,
          amentities: amenities
            ? amenities
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
          gallery: gallery ? {
            img0: gallery?.img0,
            img1: gallery?.img1,
            img2: gallery?.img2,
            img3: gallery?.img3,
            img4: gallery?.img4,
            others: gallery?.others
          } : null,
          thumbnail: hostel.thumbnail,
        };

        res.status(200).send(hostelData)
      }
    } catch (error) {
      res.status(500).send(error.message)
    }
  }
  ,


  // Update Hostel
  updateHostel: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .send({ error: 'hostelId is required' });
      } else {
        const { hostelId, thumbnail, title, desc, price, location, rating, tags, discountPrice, isPublished } = req.body;

        if (!hostelId) {
          return res.status(400).send({ error: "hostelId is required for updating a hostel" });
        }
        const slug = title.replaceAll(" ", "-");
        // Find and update the hostel
        const updatedHostel = await HostelModel.findOneAndUpdate(
          { _id: hostelId },
          {
            thumbnail: thumbnail,
            title: title,
            desc: desc,
            price: price,
            location: location,
            rating: rating,
            slug: slug,
            tags: tags,
            isPublished: isPublished,
            discountPrice: discountPrice,
          },
          { new: true } // Return the updated document
        );

        if (!updatedHostel) {
          return res.status(404).send({ error: "Hostel not found" });
        }

        return res.status(200).send(updatedHostel);
      }
    } catch (error) {
      return res.status(500).send({ error: "Internal Server Error" });
    }
  },

  deleteHostel: async (req, res) => {
    const { userId, hostelId } = req.body;

    try {
      const hostelToDelete = await HostelModel.findOneAndDelete({ _id: hostelId, userId });

      if (!hostelToDelete) {
        return res.status(404).json({ message: 'Hostel not found or you are not the owner' });
      }
      return res.json({ message: 'Hostel deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }



};

module.exports = hostelController;
