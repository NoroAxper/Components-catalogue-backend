require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000
const cors = require('cors')
app.use(cors())
const { uploadFile, getFileStream } = require('./s3')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

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
app.get('/images/:fileKey', async (req, res) => {
  const fileKey = req.params.fileKey

  try {
    const imageStream = await getFileStream(fileKey)

    // Set appropriate headers
    res.setHeader('Content-Type', 'image/jpeg')
    res.setHeader('Content-Disposition', 'inline; filename=' + fileKey)

    // Pipe the image stream to the response
    imageStream.pipe(res)
  } catch (error) {
    console.error('Error retrieving image:', error)
    res.status(500).send('Internal Server Error')
  }
})

app.post('/image', upload.single('image'), async (req, res) => {
  const fileData = req.file
  try {
    const result = await uploadFile(fileData)
    console.log(result)
    res.status(201).json({ imagePath: `/image/${result.Key}` })
  } catch (error) {
    console.error('Error uploading file:', error)
    res.status(500).send('Internal Server Error')
  }
})

const catalogueRouter = require('./routes/catalogue')
app.use('/catalogue', catalogueRouter)

const userRouter = require('./routes/user')
app.use('/user', userRouter)
// Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('listening for requests', PORT)
  })
})
