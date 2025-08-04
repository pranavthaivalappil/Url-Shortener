import express from "express";
import { createUrl, deleteUrl, getALLUrl, getUrl } from "../controllers/shortUrl";

const router = express.Router();

router.post("/shortUrl",createUrl);
router.get("/shortUrl",getALLUrl);
router.get("/shortUrl",getUrl);
router.delete("/shortUrl",deleteUrl);

export default router;

