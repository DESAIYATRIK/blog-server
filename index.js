import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

// Components
import Connection from './database/db.js';
import Router from './routes/route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const url = process.env.DB_URL;

// Middleware
app.use(cors({
    origin: 'https://blog-client-lovat.vercel.app',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', Router);

// Database connection
Connection(url);

// Start server
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
