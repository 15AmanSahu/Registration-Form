const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
  try {
    const mongodbUrl = process.env.MONGODB_URI;

    await mongoose.connect(mongodbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
