const mongoose = require("mongoose");
require('dotenv').config()

// Mongo Url
mongo_url = process.env.MONGO_URL;

mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

