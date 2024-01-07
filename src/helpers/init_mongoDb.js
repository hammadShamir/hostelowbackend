const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to the Database");
  })
  .catch((error) => {
    console.log(`Error: ${error}`);
  });

mongoose.connection.on('connected', () => {
  console.log('Monoose Connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.log(err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close()
  process.exit(0)
})