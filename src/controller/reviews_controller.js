const ReviewsModel = require("../models/reviews_model");
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
                const updatedReview = await ReviewsModel.updateOne(
                    { _id: existingReview._id },
                    {
                        $inc: { noUser: existingReview.noUser += 1 },
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
                            overallReviews: {
                                wifi: (existingReview.wifi += sanitizeNumber(wifi)) / (existingReview.noUser + 1),
                                privateBathroom: (existingReview.privateBathroom += sanitizeNumber(privateBathroom)) / (existingReview.noUser + 1),
                                bikeParking: (existingReview.bikeParking += sanitizeNumber(bikeParking)) / (existingReview.noUser + 1),
                                helpDesk: (existingReview.helpDesk += sanitizeNumber(helpDesk)) / (existingReview.noUser + 1),
                                airCondition: (existingReview.airCondition += sanitizeNumber(airCondition)) / (existingReview.noUser + 1),
                                keyAccess: (existingReview.keyAccess += sanitizeNumber(keyAccess)) / (existingReview.noUser + 1),
                                carParking: (existingReview.carParking += sanitizeNumber(carParking)) / (existingReview.noUser + 1),
                                furnishedRooms: (existingReview.furnishedRooms += sanitizeNumber(furnishedRooms)) / (existingReview.noUser + 1),
                                cctv: (existingReview.cctv += sanitizeNumber(cctv)) / (existingReview.noUser + 1),
                                commonAreas: (existingReview.commonAreas += sanitizeNumber(commonAreas)) / (existingReview.noUser + 1),
                                studyArea: (existingReview.studyArea += sanitizeNumber(studyArea)) / (existingReview.noUser + 1),
                                laundry: (existingReview.laundry += sanitizeNumber(laundry)) / (existingReview.noUser + 1),
                                cleaningServices: (existingReview.cleaningServices += sanitizeNumber(cleaningServices)) / (existingReview.noUser + 1),
                                internet: (existingReview.internet += sanitizeNumber(internet)) / (existingReview.noUser + 1),
                                bed: (existingReview.bed += sanitizeNumber(bed)) / (existingReview.noUser + 1),
                                mattress: (existingReview.mattress += sanitizeNumber(mattress)) / (existingReview.noUser + 1),
                                lunch: (existingReview.lunch += sanitizeNumber(lunch)) / (existingReview.noUser + 1),
                                dinner: (existingReview.dinner += sanitizeNumber(dinner)) / (existingReview.noUser + 1),
                                breakfast: (existingReview.breakfast += sanitizeNumber(breakfast)) / (existingReview.noUser + 1),
                                generator: (existingReview.generator += sanitizeNumber(generator)) / (existingReview.noUser + 1),
                                ups: (existingReview.ups += sanitizeNumber(ups)) / (existingReview.noUser + 1),
                                geyser: (existingReview.geyser += sanitizeNumber(geyser)) / (existingReview.noUser + 1),
                            }
                        }
                    }
                );

                return res.status(200).json({ success: true, message: "Review updated successfully", data: updatedReview });
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


function sanitizeNumber(value) {
    const sanitizedValue = parseFloat(value);
    if (!isNaN(sanitizedValue)) {
        return sanitizedValue;
    }
    return 0;
}



module.exports = reviewsController;
