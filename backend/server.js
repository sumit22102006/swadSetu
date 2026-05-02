import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import supportRoutes from './routes/supportRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect to database
// Note: We'll catch and log errors but won't crash if MongoDB isn't running locally yet
connectDB().catch(err => {
    console.log("Could not connect to MongoDB initially. Starting server anyway...");
});

const app = express();

// Request Logger for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Define Routes
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/support', supportRoutes);

const __dirname = path.resolve();
app.use('/api/uploads', express.static(path.join(__dirname, '/uploads')));

// Basic Route
app.get('/', (req, res) => {
  res.send('SwadSetu API is running...');
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
