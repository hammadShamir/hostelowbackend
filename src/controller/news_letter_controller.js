const NewsletterModel = require("../models/newsletter_model");
const { validationResult } = require("express-validator");

// News Controller
const newsletterController = {
  // Save Email Method
  saveEmail: async function (req, res) {
    try {
      const { email } = req.body;
      const user = await NewsletterModel.findOne({ email: email });
      if (user) {
        res.json({ message: "User Already Exist" });
      }
      else {
        await NewsletterModel.create({ email });
        return res.json({ message: "User Subscribed" });
      }


    } catch (error) {
      return res.status(500).send({ success: false, message: error.message });
    }
  },

  // Fetch All Subscribed Emails in Newsletter with Pagination
  fetchEmail: async function (req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const skip = (page - 1) * limit;

      const emailsSubscribe = await NewsletterModel.find({})
        .skip(skip)
        .limit(limit);

      return res.json({
        success: true,
        data: emailsSubscribe,
        message: "Email subscriptions retrieved successfully",
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(emailsSubscribe.length / limit),
          totalItems: emailsSubscribe.length,
        },
      });
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },
};

module.exports = newsletterController;
