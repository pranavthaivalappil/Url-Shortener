import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
connectDb();

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started successfully on port: ${port}`);
});