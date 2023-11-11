require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/books')

const app = express()
const PORT = process.env.PORT || 4000

mongoose.set('strictQuery', false)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
app.use((req, res, next) => {
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', '*')
  // Add other headers as needed

  // Allow all HTTP methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

  // Set the allowed headers for the preflight request
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )

  // Continue to the next middleware
  next()
})
// Routes go here
app.get('/', (req, res) => {
  try {
    const feed = Book.find()
    if (!feed) {
      return res.status(404).json({ message: 'Feed not found' })
    } else {
      return res.json(feed)
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

app.get('/books', async (req, res) => {
  const book = await Book.find()

  if (book) {
    res.json(book)
  } else {
    res.send('Something went wrong.')
  }
})

app.get('/add-note', async (req, res) => {
  try {
    await Book.insertMany([
      {
        title: 'Sons Of Anarchy',
        body: 'Body text goes here...'
      },
      {
        title: 'Games of Thrones',
        body: 'Body text goes here...'
      }
    ])
    res.json({ Data: 'Added' })
  } catch (error) {
    console.log('err', +error)
  }
})

// Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('listening for requests')
  })
})
