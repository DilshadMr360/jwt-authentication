import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // Removed deprecated options
        });
        console.log("DB Connected");
    } catch (err) {
        console.error("DB Connection Error:", err);
        process.exit(1);  // Exit the process if DB connection fails
    }
};

export default connectDB;
