const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
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

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
