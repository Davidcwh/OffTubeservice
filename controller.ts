import { VideoUtil } from "./utils/VideoUtil";
import { downloadQueue } from "./utils/DownloadQueue";
import express, { Request, Response } from "express";

const postDownload = async (req: Request, res: Response) => {
    const { youtubeUrl } = req.body;

    // check if youtubeUrl is valid
    if(!VideoUtil.isValidUrl(youtubeUrl)) {
        return res.status(500).json('Invalid youtube Url given');
    }

    await downloadQueue.add({ youtubeUrl });
    res.status(200).send("Downloading");
    
};

const getDownload = (req: Request, res: Response) => {
    const { id } = req.params;
    
    if(!VideoUtil.videoFileExists(id)) {
        return res.status(404).json('Video not found');
    }

    const videoFilePath = VideoUtil.getVideoFilePath(id);
    res.status(200).download(videoFilePath);
};

module.exports = {
    postDownload,
    getDownload
}