const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connect successfully");
  }
  catch (err) 
  {
    console.log("mongoDB connection failed" , err);
    process.exit(1);
  }
}
module.exports = connectDB;