const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan');

require("dotenv").config();
require("./src/helpers/init_mongoDb");

// Import Models
const newsletterRouter = require("./src/router/newsletter_route");
const authRouter = require("./src/router/auth_route");
const hostelRouter = require("./src/router/hostel_route");
const galleryRouter = require("./src/router/gallery_route");
const AmenitiesRouter = require("./src/router/amentities_route");
const RoomsRouter = require("./src/router/room_route");

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));
app.use(cors());
app.use(morgan('dev'));


// Middleware
const baseUrl = "/api/v1";

app.use(baseUrl, newsletterRouter);
app.use(baseUrl, authRouter);
app.use(baseUrl, hostelRouter);
app.use(baseUrl, AmenitiesRouter);
app.use(baseUrl, galleryRouter);
app.use(baseUrl, RoomsRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Server Working",
    status: 200,
  });
});

// Error Handling Middleware
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).json({
      error: {
        status: 404,
        message: 'Not Found'
      }
    });
  } else {
    res.status(err.status || 500).json({
      error: {
        status: err.status || 500,
        message: err.message || 'Internal Server Error'
      }
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Connected at PORT: " + PORT);
});
