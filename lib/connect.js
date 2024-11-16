const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}


async function dbConnect() {
  if (mongoose.connection.readyState === 1) {
    return;
  }
  await mongoose.connect(MONGODB_URI);
}

module.exports = dbConnect;
