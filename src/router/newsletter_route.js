const newsletterRouter = require("express").Router();
const newsletterController = require("../controller/news_letter_controller");

newsletterRouter.post("/newsletter", newsletterController.saveEmail
);
newsletterRouter.get("/newsletter", newsletterController.fetchEmail);

module.exports = newsletterRouter;
