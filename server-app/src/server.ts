import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import shortUrl from "./routes/shortUrl"

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Connect to database only for API routes (not health check)
app.use("/api/shortUrl", async (req, res, next) => {
    try {
        await connectDb();
        next();
    } catch (error) {
        console.error("Database connection failed:", error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ 
            message: "Database connection failed",
            error: process.env.NODE_ENV === 'development' ? errorMessage : 'Internal server error'
        });
    }
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : "http://localhost:3000",
  credentials:true,
})
);

// Root endpoint
app.get("/", (req, res) => {
    res.status(200).json({ 
        message: "URL Shortener API is running",
        version: "1.0.0"
    });
});

// Health check endpoint (no database required)
app.get("/api/health", (req, res) => {
    res.status(200).json({ 
        message: "Server is running",
        timestamp: new Date().toISOString(),
        env: {
            nodeEnv: process.env.NODE_ENV,
            hasConnectionString: !!(process.env.MONGODB_URL || process.env.CONNECTION_STRING),
            port: process.env.PORT || 5001
        }
    });
});

app.use("/api/",shortUrl);

app.listen(port, () => {
  console.log(`Server started successfully on port: ${port}`);
});

// Export for Vercel
module.exports = app;