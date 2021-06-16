import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectMongoose = async () => {
    try {
        mongoose.connect(process.env.REACT_APP_MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('MongoDB connection stablished.');
    } catch (error) {
        console.log(error);
    }
};

export default connectMongoose;
