import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

// Import your routes
import projectRoutes from './routes/projectRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import hackathonRoutes from './routes/hackathonRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import reviewRoutes from "./routes/reviewRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware to allow your server to accept JSON data from the frontend
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json({ limit: '10mb' }));

// Mount your routes
app.use('/api/projects', projectRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/hackathons', hackathonRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/resume', resumeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});