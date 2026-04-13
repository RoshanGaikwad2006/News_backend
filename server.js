const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['https://news-frontend-nine-gamma.vercel.app', 'http://localhost:8080', 'http://localhost:5173'],
  credentials: true
}));
app.use(express.json());

// Routes
const articlesRouter = require('./routes/articles');
const tickerRouter = require('./routes/ticker');
const uploadRouter = require('./routes/upload');

app.use('/api/articles', articlesRouter);
app.use('/api/ticker', tickerRouter);
app.use('/api/upload', uploadRouter);

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/global-news-hub';

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
})
  .then(() => console.log('✅ MongoDB connected successfully to Atlas'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    if (err.message.includes('MongooseServerSelectionError')) {
      console.error('👉 TIP: This is likely an IP Whitelist issue. Please check your MongoDB Atlas "Network Access" settings.');
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
