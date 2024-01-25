const ReviewsRouter = require("express").Router();
const ReviewsController = require("../controller/reviews_controller");
const { check } = require("express-validator");

// POST Reviews for a Hostel
ReviewsRouter.post(
    "/hostel/addReviews",
    [
        check("userId", "Please Enter User ID").not().isEmpty().trim().escape(),
        check("hostelId", "Please Enter Hostel ID").not().isEmpty().trim().escape(),
    ],
    ReviewsController.addHostelReviews
);


ReviewsRouter.post("/hostel/getReviews", ReviewsController.getHostelReviews);

module.exports = ReviewsRouter;
