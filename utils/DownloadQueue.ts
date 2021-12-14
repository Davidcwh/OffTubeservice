import Bull from "bull";
import { Events } from "./Constants";
import { SocketInit } from "./Socket.io";
import { VideoUtil } from "./VideoUtil";

const downloadQueue = new Bull("download queue", {
    redis: {
        host: process.env.REDIS_HOST!,
        port: parseInt(process.env.REDIS_PORT!)
    }
});

downloadQueue.process((job, done) => {
    return new Promise(async (resolve, reject) => {
        const { youtubeUrl } = job.data;

        const socket = SocketInit.getInstance();
        const title = VideoUtil.getVideoFileTitle(youtubeUrl);

        VideoUtil.downloadVideo(youtubeUrl)
                    .on("finish", async () => {
                        socket.publishEvent(Events.VIDEO_DOWNLOADED, title);
                        console.log("Download completed")

                        done();
                        resolve({ title });
                    })
                    .on("ready", () => {
                        socket.publishEvent(Events.VIDEO_STARTED, title);
                        console.log("Download started")
                    })
                    .on("error", (error: Error) => {
                        socket.publishEvent(Events.VIDEO_ERROR, error);
                        console.log("Download error")

                        done(error);
                        reject(error);
                    })
    })
});

export { downloadQueue };