import mongoose from 'mongoose';
import 'dotenv/config';

export const connectDB = async () => {
    try{
       const url = process.env.MONGO_URI;
       await mongoose.connect(url);
       console.log('MongoDB Connected');
    } catch (error) {
       console.error(`Error: ${error.message}`);
    }
};
