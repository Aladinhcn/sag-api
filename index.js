import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';  // Import the CORS package
import bookRoutes from './src/routes/book.route.js';
import errorHandler from './src/middlewares/errorHandler.middleware.js';

// Load environment variables
config();

// Initialize the app
const app = express();

// Set the port from the environment variable or default to 3000
const PORT = process.env.PORT || 9800;

// Enable CORS for all domains (you can restrict this to specific domains later)
app.use(cors());

// Use routes
app.use('/api', bookRoutes);

// Global error handler middleware
app.use(errorHandler);

// Middleware to handle invalid routes (404)
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
