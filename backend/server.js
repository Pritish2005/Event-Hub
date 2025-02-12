const express = require('express');
const mongoose=require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const auth=require('./routes/auth.route.js');
const event=require('./routes/event.route.js');

app.use(express.json());
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow cookies (for authentication)
  })
);
const port = process.env.PORT||5000;

app.use('/api/auth',auth);
app.use('/api/event',event);

const connectToDb=async()=>{
  const db=await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');
  app.listen(port,()=>{
      console.log(`Server is running on port ${port}`);
  });
  return db;
}

connectToDb();
