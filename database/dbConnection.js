const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    const CONNECT = await mongoose.connect(process.env.MONGO_URL);
    if (CONNECT) {
      console.log(`connection has been stablished with database`);
      console.log(process.env.MONGO_URL);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect with the databse")
  }
};

module.exports = dbConnect;
