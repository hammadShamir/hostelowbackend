const ReviewsModel = require("../models/reviews_model");
const AverageReviewsModel = require("../models/average_review_model");
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
                await ReviewsModel.updateOne(
                    { _id: existingReview._id },
                    {
                        $inc: { noUser: 1 },
                        $set: {
                            wifi: wifi,
                            privateBathroom: privateBathroom,
                            bikeParking: bikeParking,
                            helpDesk: helpDesk,
                            airCondition: airCondition,
                            keyAccess: keyAccess,
                            carParking: carParking,
                            furnishedRooms: furnishedRooms,
                            cctv: cctv,
                            commonAreas: commonAreas,
                            studyArea: studyArea,
                            laundry: laundry,
                            cleaningServices: cleaningServices,
                            internet: internet,
                            bed: bed,
                            mattress: mattress,
                            lunch: lunch,
                            dinner: dinner,
                            breakfast: breakfast,
                            generator: generator,
                            ups: ups,
                            geyser: geyser,
                        }
                    }
                );

                await AverageReviewsModel.updateOne(
                    { hostelId: hostelId },
                    {
                        $inc: { noUser: 1 },
                        $set: {
                            wifi: (existingReview.wifi += sanitizeNumber(wifi)) / (existingReview.noUser),
                            privateBathroom: (existingReview.privateBathroom += sanitizeNumber(privateBathroom)) / (existingReview.noUser),
                            bikeParking: (existingReview.bikeParking += sanitizeNumber(bikeParking)) / (existingReview.noUser),
                            helpDesk: (existingReview.helpDesk += sanitizeNumber(helpDesk)) / (existingReview.noUser),
                            airCondition: (existingReview.airCondition += sanitizeNumber(airCondition)) / (existingReview.noUser),
                            keyAccess: (existingReview.keyAccess += sanitizeNumber(keyAccess)) / (existingReview.noUser),
                            carParking: (existingReview.carParking += sanitizeNumber(carParking)) / (existingReview.noUser),
                            furnishedRooms: (existingReview.furnishedRooms += sanitizeNumber(furnishedRooms)) / (existingReview.noUser),
                            cctv: (existingReview.cctv += sanitizeNumber(cctv)) / (existingReview.noUser),
                            commonAreas: (existingReview.commonAreas += sanitizeNumber(commonAreas)) / (existingReview.noUser),
                            studyArea: (existingReview.studyArea += sanitizeNumber(studyArea)) / (existingReview.noUser),
                            laundry: (existingReview.laundry += sanitizeNumber(laundry)) / (existingReview.noUser),
                            cleaningServices: (existingReview.cleaningServices += sanitizeNumber(cleaningServices)) / (existingReview.noUser),
                            internet: (existingReview.internet += sanitizeNumber(internet)) / (existingReview.noUser),
                            bed: (existingReview.bed += sanitizeNumber(bed)) / (existingReview.noUser),
                            mattress: (existingReview.mattress += sanitizeNumber(mattress)) / (existingReview.noUser),
                            lunch: (existingReview.lunch += sanitizeNumber(lunch)) / (existingReview.noUser),
                            dinner: (existingReview.dinner += sanitizeNumber(dinner)) / (existingReview.noUser),
                            breakfast: (existingReview.breakfast += sanitizeNumber(breakfast)) / (existingReview.noUser),
                            generator: (existingReview.generator += sanitizeNumber(generator)) / (existingReview.noUser),
                            ups: (existingReview.ups += sanitizeNumber(ups)) / (existingReview.noUser),
                            geyser: (existingReview.geyser += sanitizeNumber(geyser)) / (existingReview.noUser),
                        },
                    }
                );

                return res.status(200).json({ message: "Review updated successfully" });

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


                const averageReviewModel = new AverageReviewsModel({
                    hostelId,
                    wifi: wifi,
                    privateBathroom: privateBathroom,
                    helpDesk: helpDesk,
                    airCondition: airCondition,
                    keyAccess: keyAccess,
                    carParking: carParking,
                    furnishedRooms: furnishedRooms,
                    cctv: cctv,
                    commonAreas: commonAreas,
                    studyArea: studyArea,
                    laundry: laundry,
                    cleaningServices: cleaningServices,
                    internet: internet,
                    bed: bed,
                    mattress: mattress,
                    lunch: lunch,
                    dinner: dinner,
                    breakfast: breakfast,
                    generator: generator,
                    ups: ups,
                    geyser: geyser,
                });

                await averageReviewModel.save();

                return res.status(200).json({
                    message: "Review saved successfully",

                });
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


function sanitizeNumber(value) {
    const sanitizedValue = parseFloat(value);
    if (!isNaN(sanitizedValue)) {
        return sanitizedValue;
    }
    return 0;
}



module.exports = reviewsController;
