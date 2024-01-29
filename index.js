// require('dotenv').config()
// const bodyParser = require('body-parser')
// const express = require('express')
// const mongoose = require('mongoose')
// const app = express()
// app.use(bodyParser.json())
// const PORT = process.env.PORT || 3000
// const cors = require('cors')
// app.use(cors())


// mongoose.set('strictQuery', false)
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI)
//     console.log(`MongoDB Connected: ${conn.connection.host}`)
//   } catch (error) {
//     console.log(error)
//     process.exit(1)
//   }
// }
// app.use((req, res, next) => {
//   // Set CORS headers
//   res.header('Access-Control-Allow-Origin', '*')
//   // Add other headers as needed

//   // Allow all HTTP methods
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

//   // Set the allowed headers for the preflight request
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   )

//   // Continue to the next middleware
//   next()
// })
// // Routes go here
// const loginRouter = require('./routes/login')
// app.use('/login', loginRouter)

// const subscriberRouter = require('./routes/subscriber')
// app.use('/subscriber', subscriberRouter)

// const registerRouter = require('./routes/register')
// app.use('/register', registerRouter)

// const userRoute = require('./routes/user')
// const authenticateToken = require('./utils/auth')
// app.use('/user', authenticateToken, userRoute)
// // Connect to the database before listening
// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log('listening for requests')
//   })
// })
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000

// Set 'strictQuery' option for Mongoose (to suppress the deprecation warning)
mongoose.set('strictQuery', false)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

// Routes go here
app.all('*', (req, res) => {
  res.json({ everything: 'is awesome' })
})

// Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
})