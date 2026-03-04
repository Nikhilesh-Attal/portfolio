// config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Mongoose connects directly using your Atlas URL
    const conn = await mongoose.connect(process.env.mongodb_url);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Stop the server if the database fails to connect
  }
};

export default connectDB;