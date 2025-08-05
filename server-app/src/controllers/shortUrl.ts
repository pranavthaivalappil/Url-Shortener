import express from "express";
import {urlModel} from "../model/shortUrl";

export const createUrl = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { fullUrl } = req.body;
        const urlFound = await urlModel.findOne({ fullUrl });
        
        if (urlFound) {
            res.status(409).json(urlFound);
        } else {
            const shortUrl = await urlModel.create({ fullUrl });
            res.status(201).json(shortUrl);
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};

export const getAllUrl = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const shortUrls = await urlModel.find().sort({ createdAt: -1 });
        res.status(200).json(shortUrls);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};

export const getUrl = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
        if (!shortUrl) {
            res.status(404).json({ message: "URL not found!" });
        } else {
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`);
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};

export const deleteUrl = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const shortUrl = await urlModel.findByIdAndDelete(req.params.id);
        if (!shortUrl) {
            res.status(404).json({ message: "URL not found!" });
        } else {
            res.status(200).json({ message: "URL deleted successfully!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};