import express from 'express'
const app = express()
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
dotenv.config()
import { UserRouter } from './routes/user.js';
import cookieParser from 'cookie-parser'

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use('/auth', UserRouter)
app.use(cookieParser())

mongoose.connect(process.env.ATLASDB_URL)
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})




