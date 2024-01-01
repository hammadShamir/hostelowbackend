const newsletterRouter = require("express").Router();
const newsletterController = require("../controller/news_letter_controller");
const { check } = require("express-validator");
const NewsletterModel = require("../models/newsletter_model");

newsletterRouter.post(
  "/newsletter",
  [
    check("email")
      .isEmail()
      .custom((value, { req }) => {
        return new Promise((resolve, reject) => {
          NewsletterModel.findOne({ email: req.body.email })
            .then((user) => {
              if (user) {
                reject(new Error("Email already registered"));
              } else {
                resolve(true);
              }
            })
            .catch((err) => {
              reject(new Error(err));
            });
        });
      }),
  ],
  newsletterController.saveEmail
);
newsletterRouter.get("/newsletter", newsletterController.fetchEmail);

module.exports = newsletterRouter;
