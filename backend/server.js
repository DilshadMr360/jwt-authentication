import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js'; // Ensure this path is correct

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

app.use('/api/auth', userRoutes); // Ensure this is correctly applied

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
