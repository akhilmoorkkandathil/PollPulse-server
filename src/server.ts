import express from 'express';
import { json } from 'body-parser';
import userRoutes from './routes/user.route';
import dotenv from 'dotenv';
import cors from 'cors';
import corsOptions from './config/cors'
import connectToDatabase from './utils/db';
import bodyParser from 'body-parser';


const app = express();
const port = process.env.PORT || 3000;


dotenv.config();

connectToDatabase();
// Middleware
app.use(bodyParser.json());
// CORS middleware
app.use(cors(corsOptions));

// Routes
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
