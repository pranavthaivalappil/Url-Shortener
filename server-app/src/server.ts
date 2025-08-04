import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import shortUrl from "./routes/shortUrl"

dotenv.config();
connectDb();

const app = express();
const port = process.env.PORT || 5001;
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
  origin: "http://localhost:3000",
  credentials:true,
})
);

app.use("/api/",shortUrl);


app.listen(port, () => {
  console.log(`Server started successfully on port: ${port}`);
});