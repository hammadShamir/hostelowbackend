const ReviewsModel = require("../models/reviews_model");
const HostelModel = require("../models/hostel_model");
const { validationResult } = require("express-validator");

const reviewsController = {
    addHostelReviews: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ errors: 'All fields are required' });
            }

            const { hostelId, userId, ...hostelReviews } = req.body;
            const {
                wifi,
                privateBathroom,
                bikeParking,
                helpDesk,
                airCondition,
                keyAccess,
                carParking,
                furnishedRooms,
                cctv,
                commonAreas,
                studyArea,
                laundry,
                cleaningServices,
                internet,
                bed,
                mattress,
                lunch,
                dinner,
                breakfast,
                generator,
                ups,
                geyser,
            } = hostelReviews;

            const existingReview = await ReviewsModel.findOne({ hostelId: hostelId, userId: userId });

            if (existingReview) {
                existingReview.noUser += 1;
                existingReview.wifi = wifi;
                existingReview.privateBathroom = privateBathroom;
                existingReview.bikeParking = bikeParking;
                existingReview.helpDesk = helpDesk;
                existingReview.airCondition = airCondition;
                existingReview.keyAccess = keyAccess;
                existingReview.carParking = carParking;
                existingReview.furnishedRooms = furnishedRooms;
                existingReview.cctv = cctv;
                existingReview.commonAreas = commonAreas;
                existingReview.studyArea = studyArea;
                existingReview.laundry = laundry;
                existingReview.cleaningServices = cleaningServices;
                existingReview.internet = internet;
                existingReview.bed = bed;
                existingReview.mattress = mattress;
                existingReview.lunch = lunch;
                existingReview.dinner = dinner;
                existingReview.breakfast = breakfast;
                existingReview.generator = generator;
                existingReview.ups = ups;
                existingReview.geyser = geyser;

                const savedReview = await existingReview.save();
                return res.status(200).json({ success: true, message: "Review updated successfully", data: savedReview });
            } else {

                const newReview = new ReviewsModel({
                    hostelId,
                    userId,
                    wifi,
                    privateBathroom,
                    bikeParking,
                    helpDesk,
                    airCondition,
                    keyAccess,
                    carParking,
                    furnishedRooms,
                    cctv,
                    commonAreas,
                    studyArea,
                    laundry,
                    cleaningServices,
                    internet,
                    bed,
                    mattress,
                    lunch,
                    dinner,
                    breakfast,
                    generator,
                    ups,
                    geyser,
                });

                const savedReview = await newReview.save();
                return res.status(200).json({ success: true, message: "Review saved successfully", data: savedReview });
            }
        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    },

    getHostelReviews: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ errors: 'All fields are required' });
            }
            const { hostelId } = req.body;
            const hostelReviews = await ReviewsModel.find({ hostelId: hostelId });
            if (!hostelReviews) {
                return res.status(400)
                    .json({ errors: 'No Reviews Found' });
            }
            return res.json(hostelReviews);

        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }


};


module.exports = reviewsController;
