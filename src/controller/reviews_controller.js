const ReviewsModel = require("../models/reviews_model");
const AverageReviewsModel = require("../models/average_review_model");
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
            let data = {};
            const { hostelId, userId, wifi, privateBathroom, bikeParking, helpDesk, airCondition, keyAccess, carParking, furnishedRooms, cctv, commonAreas, studyArea, laundry, cleaningServices, internet, bed, mattress, lunch, dinner, breakfast, generator, ups, geyser } = req.body;
            const newReview = await ReviewsModel.create({ hostelId, userId, wifi, privateBathroom, bikeParking, helpDesk, airCondition, keyAccess, carParking, furnishedRooms, cctv, commonAreas, studyArea, laundry, cleaningServices, internet, bed, mattress, lunch, dinner, breakfast, generator, ups, geyser });
            const averageHostelRev = await AverageReviewsModel.findOne({ hostelId: hostelId });
            if (!averageHostelRev) {
                await AverageReviewsModel.create({ hostelId, wifi, privateBathroom, bikeParking, helpDesk, airCondition, keyAccess, carParking, furnishedRooms, cctv, commonAreas, studyArea, laundry, cleaningServices, internet, bed, mattress, lunch, dinner, breakfast, generator, ups, geyser });
            }
            else {
                const allHostelReview = await ReviewsModel.find({ hostelId: hostelId });
                let allReviews = { wifi: [], privateBathroom: [], bikeParking: [], helpDesk: [], airCondition: [], keyAccess: [], carParking: [], furnishedRooms: [], cctv: [], commonAreas: [], studyArea: [], laundry: [], cleaningServices: [], internet: [], bed: [], mattress: [], lunch: [], dinner: [], breakfast: [], generator: [], ups: [], geyser: [] };
                allHostelReview.forEach(review => {

                    allReviews.wifi.push(review.wifi)
                    allReviews.privateBathroom.push(review.privateBathroom)
                    allReviews.bikeParking.push(review.bikeParking)
                    allReviews.helpDesk.push(review.helpDesk)
                    allReviews.airCondition.push(review.airCondition)
                    allReviews.keyAccess.push(review.keyAccess)
                    allReviews.carParking.push(review.carParking)
                    allReviews.furnishedRooms.push(review.furnishedRooms)
                    allReviews.cctv.push(review.cctv)
                    allReviews.commonAreas.push(review.commonAreas)
                    allReviews.studyArea.push(review.studyArea)
                    allReviews.laundry.push(review.laundry)
                    allReviews.cleaningServices.push(review.cleaningServices)
                    allReviews.internet.push(review.internet)
                    allReviews.bed.push(review.bed)
                    allReviews.mattress.push(review.mattress)
                    allReviews.lunch.push(review.lunch)
                    allReviews.dinner.push(review.dinner)
                    allReviews.breakfast.push(review.breakfast)
                    allReviews.generator.push(review.generator)
                    allReviews.ups.push(review.ups)
                    allReviews.geyser.push(review.geyser)
                });

                data = await AverageReviewsModel.findOneAndUpdate(
                    { hostelId: hostelId },

                    {

                        $set: {
                            wifi: allReviews.wifi.reduce((acc, cv) => acc + cv, 0) / allReviews.wifi.length,
                            privateBathroom: allReviews.privateBathroom.reduce((acc, cv) => acc + cv, 0) / allReviews.privateBathroom.length,
                            bikeParking: allReviews.bikeParking.reduce((acc, cv) => acc + cv, 0) / allReviews.bikeParking.length,
                            helpDesk: allReviews.helpDesk.reduce((acc, cv) => acc + cv, 0) / allReviews.helpDesk.length,
                            airCondition: allReviews.airCondition.reduce((acc, cv) => acc + cv, 0) / allReviews.airCondition.length,
                            keyAccess: allReviews.keyAccess.reduce((acc, cv) => acc + cv, 0) / allReviews.keyAccess.length,
                            carParking: allReviews.carParking.reduce((acc, cv) => acc + cv, 0) / allReviews.carParking.length,
                            furnishedRooms: allReviews.furnishedRooms.reduce((acc, cv) => acc + cv, 0) / allReviews.furnishedRooms.length,
                            cctv: allReviews.cctv.reduce((acc, cv) => acc + cv, 0) / allReviews.cctv.length,
                            commonAreas: allReviews.commonAreas.reduce((acc, cv) => acc + cv, 0) / allReviews.commonAreas.length,
                            studyArea: allReviews.studyArea.reduce((acc, cv) => acc + cv, 0) / allReviews.studyArea.length,
                            laundry: allReviews.laundry.reduce((acc, cv) => acc + cv, 0) / allReviews.laundry.length,
                            cleaningServices: allReviews.cleaningServices.reduce((acc, cv) => acc + cv, 0) / allReviews.cleaningServices.length,
                            internet: allReviews.internet.reduce((acc, cv) => acc + cv, 0) / allReviews.internet.length,
                            bed: allReviews.bed.reduce((acc, cv) => acc + cv, 0) / allReviews.bed.length,
                            mattress: allReviews.mattress.reduce((acc, cv) => acc + cv, 0) / allReviews.mattress.length,
                            lunch: allReviews.lunch.reduce((acc, cv) => acc + cv, 0) / allReviews.lunch.length,
                            dinner: allReviews.dinner.reduce((acc, cv) => acc + cv, 0) / allReviews.dinner.length,
                            breakfast: allReviews.breakfast.reduce((acc, cv) => acc + cv, 0) / allReviews.breakfast.length,
                            generator: allReviews.generator.reduce((acc, cv) => acc + cv, 0) / allReviews.generator.length,
                            ups: allReviews.ups.reduce((acc, cv) => acc + cv, 0) / allReviews.ups.length,
                            geyser: allReviews.geyser.reduce((acc, cv) => acc + cv, 0) / allReviews.geyser.length,
                        }
                    }
                );


                const ratingValues = [
                    data.wifi,
                    data.privateBathroom,
                    data.bikeParking,
                    data.helpDesk,
                    data.airCondition,
                    data.keyAccess,
                    data.carParking,
                    data.furnishedRooms,
                    data.cctv,
                    data.commonAreas,
                    data.studyArea,
                    data.laundry,
                    data.cleaningServices,
                    data.internet,
                    data.bed,
                    data.mattress,
                    data.lunch,
                    data.dinner,
                    data.breakfast,
                    data.generator,
                    data.ups,
                    data.geyser
                ].filter(value => value !== "" && value !== 0 && value !== null && value !== undefined);

                // Calculate average rating
                const sum = ratingValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                const averageRating = ratingValues.length > 0 ? sum / ratingValues.length : 0;

                console.log(averageRating);
                await HostelModel.findOneAndUpdate({ _id: hostelId }, { rating: averageRating });
            }

            const ratingValues = [
                data.wifi,
                data.privateBathroom,
                data.bikeParking,
                data.helpDesk,
                data.airCondition,
                data.keyAccess,
                data.carParking,
                data.furnishedRooms,
                data.cctv,
                data.commonAreas,
                data.studyArea,
                data.laundry,
                data.cleaningServices,
                data.internet,
                data.bed,
                data.mattress,
                data.lunch,
                data.dinner,
                data.breakfast,
                data.generator,
                data.ups,
                data.geyser
            ].filter(value => value !== "" && value !== 0 && value !== null && value !== undefined);

            // Calculate average rating
            const sum = ratingValues.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            const averageRating = ratingValues.length > 0 ? sum / ratingValues.length : 0;

            console.log(averageRating);
            await HostelModel.findOneAndUpdate({ _id: hostelId }, { rating: averageRating, $inc: { reviewCount: 1 } });

            res.json({ message: "Reviews Added", review: newReview })

        } catch (error) {
            console.log(error);
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
            const { hostelId, userId } = req.body;
            let query;
            if (hostelId) {
                query = { hostelId: hostelId };
            } else if (userId) {
                query = { userId: userId };
            } else {
                return res.status(400).json({ errors: 'Either hostelId or userId is required' });
            }

            const hostelReviews = await ReviewsModel.find(query);

            if (!hostelReviews || hostelReviews.length === 0) {
                return res.status(400).json({ errors: 'No Reviews Found' });
            }
            return res.json(hostelReviews);

        } catch (error) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

};


function sanitizeNumber(value) {
    const sanitizedValue = parseFloat(value);
    if (!isNaN(sanitizedValue)) {
        return sanitizedValue;
    }
    return 0;
}



module.exports = reviewsController;
