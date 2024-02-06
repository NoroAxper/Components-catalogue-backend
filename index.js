require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(cors()); // Use the cors middleware

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
