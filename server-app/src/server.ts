import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import shortUrl from "./routes/shortUrl"

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Connect to database only when needed
app.use(async (req, res, next) => {
    try {
        await connectDb();
        next();
    } catch (error) {
        console.error("Database connection failed:", error);
        res.status(500).json({ 
            message: "Database connection failed",
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
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

app.use("/api/",shortUrl);


app.listen(port, () => {
  console.log(`Server started successfully on port: ${port}`);
});

// Export for Vercel
module.exports = app;