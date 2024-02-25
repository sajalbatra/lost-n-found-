import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connect from './config/connect.js';
import userRoutes from './routes/userRoutes.js';
import itemRoutes from './routes/itemRoutes.js';

dotenv.config();
const app =express();
const PORT = process.env.PORT || 8001;
const MONGODB_STRING = process.env.MONGODB_STRING;
const BASE_URL = process.env.BASE_URL;
const DB_NAME = process.env.DB_NAME;

app.use(express.json());

app.use(cors());

//routes

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/item",itemRoutes)


//starting the server
app.listen(PORT, ()=>{
    connect(MONGODB_STRING, DB_NAME);
    console.log(`Server running on ${BASE_URL+PORT} `);
})
