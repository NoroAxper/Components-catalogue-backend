require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(cors());

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

app.use((req, res, next) => {
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  // Add other headers as needed

  // Allow all HTTP methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  // Set the allowed headers for the preflight request
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  // Continue to the next middleware
  next();
});

// Existing routes
const catalogueRouter = require('./routes/catalogue');
app.use('/catalogue', catalogueRouter);

// New routes for image upload
const imageRouter = require('./routes/images');
app.use('/images', imageRouter);

// Connect to the database before listening
connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running');
  });
});
