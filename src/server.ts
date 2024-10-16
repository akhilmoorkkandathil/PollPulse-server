import express from 'express';
import { json } from 'body-parser';
import userRoutes from './routes/user.route';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(json());

// Routes
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
