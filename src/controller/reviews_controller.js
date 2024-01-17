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
            await HostelModel.findOneAndUpdate({ _id: hostelId }, { rating: averageRating });

            res.json({ message: "Reviews Added", review: newReview })





            // console.log(allReviews);

            // const existingReview = await ReviewsModel.findOne({ hostelId: hostelId, userId: userId });

            // if (existingReview) {
            //     const rev = await ReviewsModel.findOneAndUpdate(
            //         { _id: hostelId },
            //         {
            //             $inc: { noUser: 1 },
            //             $set: {
            //                 wifi: wifi,
            //                 privateBathroom: privateBathroom,
            //                 bikeParking: bikeParking,
            //                 helpDesk: helpDesk,
            //                 airCondition: airCondition,
            //                 keyAccess: keyAccess,
            //                 carParking: carParking,
            //                 furnishedRooms: furnishedRooms,
            //                 cctv: cctv,
            //                 commonAreas: commonAreas,
            //                 studyArea: studyArea,
            //                 laundry: laundry,
            //                 cleaningServices: cleaningServices,
            //                 internet: internet,
            //                 bed: bed,
            //                 mattress: mattress,
            //                 lunch: lunch,
            //                 dinner: dinner,
            //                 breakfast: breakfast,
            //                 generator: generator,
            //                 ups: ups,
            //                 geyser: geyser,
            //             }
            //         }
            //     );

            //     const updateRev = await AverageReviewsModel.findOneAndUpdate(
            //         { hostelId: hostelId },
            //         {
            //             $inc: { noUser: 1 },
            //             $set: {
            //                 wifi: (existingReview.wifi + sanitizeNumber(wifi)) / (existingReview.noUser),
            //                 privateBathroom: (existingReview.privateBathroom + sanitizeNumber(privateBathroom)) / (existingReview.noUser),
            //                 bikeParking: (existingReview.bikeParking + sanitizeNumber(bikeParking)) / (existingReview.noUser),
            //                 helpDesk: (existingReview.helpDesk + sanitizeNumber(helpDesk)) / (existingReview.noUser),
            //                 airCondition: (existingReview.airCondition + sanitizeNumber(airCondition)) / (existingReview.noUser),
            //                 keyAccess: (existingReview.keyAccess + sanitizeNumber(keyAccess)) / (existingReview.noUser),
            //                 carParking: (existingReview.carParking + sanitizeNumber(carParking)) / (existingReview.noUser),
            //                 furnishedRooms: (existingReview.furnishedRooms + sanitizeNumber(furnishedRooms)) / (existingReview.noUser),
            //                 cctv: (existingReview.cctv + sanitizeNumber(cctv)) / (existingReview.noUser),
            //                 commonAreas: (existingReview.commonAreas + sanitizeNumber(commonAreas)) / (existingReview.noUser),
            //                 studyArea: (existingReview.studyArea + sanitizeNumber(studyArea)) / (existingReview.noUser),
            //                 laundry: (existingReview.laundry + sanitizeNumber(laundry)) / (existingReview.noUser),
            //                 cleaningServices: (existingReview.cleaningServices + sanitizeNumber(cleaningServices)) / (existingReview.noUser),
            //                 internet: (existingReview.internet + sanitizeNumber(internet)) / (existingReview.noUser),
            //                 bed: (existingReview.bed + sanitizeNumber(bed)) / (existingReview.noUser),
            //                 mattress: (existingReview.mattress + sanitizeNumber(mattress)) / (existingReview.noUser),
            //                 lunch: (existingReview.lunch + sanitizeNumber(lunch)) / (existingReview.noUser),
            //                 dinner: (existingReview.dinner + sanitizeNumber(dinner)) / (existingReview.noUser),
            //                 breakfast: (existingReview.breakfast += sanitizeNumber(breakfast)) / (existingReview.noUser),
            //                 generator: (existingReview.generator += sanitizeNumber(generator)) / (existingReview.noUser),
            //                 ups: (existingReview.ups += sanitizeNumber(ups)) / (existingReview.noUser),
            //                 geyser: (existingReview.geyser += sanitizeNumber(geyser)) / (existingReview.noUser),
            //             },
            //         }
            //     );

            //     return res.status(200).json({ message: "Review updated successfully", update: updateRev, rev: rev });

            // } else {

            //     const newReview = await ReviewsModel.create({
            //         hostelId,
            //         userId,
            //         wifi,
            //         privateBathroom,
            //         bikeParking,
            //         helpDesk,
            //         airCondition,
            //         keyAccess,
            //         carParking,
            //         furnishedRooms,
            //         cctv,
            //         commonAreas,
            //         studyArea,
            //         laundry,
            //         cleaningServices,
            //         internet,
            //         bed,
            //         mattress,
            //         lunch,
            //         dinner,
            //         breakfast,
            //         generator,
            //         ups,
            //         geyser,
            //     });




            //     const averageReviewModel = await AverageReviewsModel.create({
            //         hostelId: hostelId,
            //         wifi: wifi,
            //         privateBathroom: privateBathroom,
            //         helpDesk: helpDesk,
            //         airCondition: airCondition,
            //         keyAccess: keyAccess,
            //         carParking: carParking,
            //         furnishedRooms: furnishedRooms,
            //         cctv: cctv,
            //         commonAreas: commonAreas,
            //         studyArea: studyArea,
            //         laundry: laundry,
            //         cleaningServices: cleaningServices,
            //         internet: internet,
            //         bed: bed,
            //         mattress: mattress,
            //         lunch: lunch,
            //         dinner: dinner,
            //         breakfast: breakfast,
            //         generator: generator,
            //         ups: ups,
            //         geyser: geyser,
            //     });


            //     return res.status(200).json({ message: "Review saved successfully", data: averageReviewModel });
            // }
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
