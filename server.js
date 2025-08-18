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
    origin: ["https://nextfortunebd.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use((req, res, next) => {
  console.log("Request from:", req.headers.origin);
  next();
});


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
