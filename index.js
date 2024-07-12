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
    origin:["https://blog-client-lovat.vercel.app/account"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
app.options('*', cors()); // Preflight all routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Custom CORS headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Routes
app.use('/', Router);

// Database connection
Connection(url);

// Start server
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
