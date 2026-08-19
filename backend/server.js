import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:5173'];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({ 
  origin: allowedOrigins, 
  credentials: true 
}));

app.use(express.json());
connectDB();

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Authentication API is running');
});

// To ensure local development continues to work via `npm run dev`
// while still satisfying Vercel's serverless function requirements.
if (!process.env.VERCEL) {
  app.listen(3000, () => {
    console.log('Local development server running on port 3000');
  });
}

export default app;