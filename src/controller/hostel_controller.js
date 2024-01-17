const HostelModel = require("../models/hostel_model");
const AmentityModel = require("../models/amentities_model");
const AverageReviewsModel = require("../models/average_review_model");
const RoomModel = require("../models/room_model");
const GalleryModel = require("../models/gallery_model");
const { validationResult } = require("express-validator");
const { buildQuery } = require("../helpers/search_filters");

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
      const queryObject = buildQuery(req.query)
      const hostels = await HostelModel.find(queryObject);
      let hostelsWithAmenities = [];

      for (const element of hostels) {
        const amenities = await AmentityModel.findOne({
          hostelId: element._id,
        }).select(`-hostelId -_id -date -__v`);

        const hostelReviews = await AverageReviewsModel.findOne({
          hostelId: element._id,
        }).select(`-hostelId -_id -date -__v`)

        const rooms = !!queryObject.slug && await RoomModel.find({
          hostelId: element._id,
        });

        const gallery = !!queryObject.slug && await GalleryModel.findOne({
          hostelId: element._id
        })


        const roomsArray = !!queryObject.slug && rooms.map(room => ({
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
          slug: element.slug,
          desc: element.desc,
          price: element.price,
          location: element.location,
          rating: element.rating,
          date: element.date,
          tags: element.tags,
          rating: element.rating,
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
              privateBathroom: hostelReviews.privateBathroom,
              bikeParking: hostelReviews.bikeParking,
              helpDesk: hostelReviews.helpDesk,
              airCondition: hostelReviews.airCondition,
              keyAccess: hostelReviews.keyAccess,
              carParking: hostelReviews.carParking,
              furnishedRooms: hostelReviews.furnishedRooms,
              cctv: hostelReviews.cctv,
              commonAreas: hostelReviews.commonAreas,
              studyArea: hostelReviews.studyArea,
              laundry: hostelReviews.laundry,
              cleaningServices: hostelReviews.cleaningServices,
              internet: hostelReviews.internet,
              bed: hostelReviews.bed,
              mattress: hostelReviews.mattress,
              lunch: hostelReviews.lunch,
              dinner: hostelReviews.dinner,
              breakfast: hostelReviews.breakfast,
              generator: hostelReviews.generator,
              ups: hostelReviews.ups,
              geyser: hostelReviews.geyser,
            }
            : null,
          ...(queryObject.slug
            ? {
              rooms: roomsArray.length > 0 ? roomsArray : null,
            }
            : {}),
          thumbnail: element.thumbnail,
          ...(queryObject.slug
            ? {
              gallery: gallery
                ? {
                  img0: gallery.img0,
                  img1: gallery.img1,
                  img2: gallery.img2,
                  img3: gallery.img3,
                  img4: gallery.img4,
                  others: gallery.others,
                }
                : null,
            }
            : {}),
        };

        hostelsWithAmenities.push(hostelWithAmenities);
      }
      res.send({ hostels: hostelsWithAmenities });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

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
