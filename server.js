import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect Database & Cloudinary (Error Handling Added)
connectDB()
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB Connection Error:', err));

connectCloudinary()
    .then(() => console.log('Cloudinary Connected'))
    .catch((err) => console.error('Cloudinary Connection Error:', err));

// Middlewares
app.use(express.json());
app.use(cors({
    origin: '*', // Allow requests from any origin (Modify if a specific frontend is needed)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)


// Root Route
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is Working' });
});

// Error Handling (Handles unexpected server crashes)
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Promise Rejection:', reason);
});

// Start Server
app.listen(port, () => console.log(`Server started on port: ${port}`));
