const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI_STUDENT;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); 
    }
};

module.exports = connectDB;
