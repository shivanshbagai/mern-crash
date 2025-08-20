//express server setup
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';
import path from "path";

import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT =   process.env.PORT || 5001;

// Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true
}));

const __dirname = path.resolve();

app.use(express.json()); // allows us to accept JSON data in req.body

// Simple health check - only in development (avoid conflicting with SPA in production)
if (process.env.NODE_ENV !== "production") {
    app.get("/", (req, res) => {
        res.status(200).send("API is running");
    });
}

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production")
{
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    // Handle client-side routing - serve index.html for all non-API routes (Express 5 compatible)
    app.get(/^(?!\/api).*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Serve started at http://localhost:"+PORT );
});
