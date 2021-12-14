// encapsulates video management code - video url validation, video downloading, deleting etc

const ytdl = require('ytdl-core');
const fs = require('fs')

export class VideoUtil {
    private static videosDirectory = 'downloads';

    public static getVideoFileTitle(youtubeUrl: string): string {
        try {
            return ytdl.getURLVideoID(youtubeUrl);
        } catch(err) {
            console.error(err);
            return ''
        }
    }

    public static getVideoFilePath(title: string): string {
        return `${process.cwd()}/${this.videosDirectory}/${title}.mp4`;
    }

    public static isValidUrl(youtubeUrl: string): boolean {
        return ytdl.validateURL(youtubeUrl);
    }

    public static videoFileExists(id: string): boolean {
        const videoFilePath = this.getVideoFilePath(id);
        return fs.existsSync(videoFilePath);
    }

    public static downloadVideo(youtubeUrl: string): any {
        const title = this.getVideoFileTitle(youtubeUrl);
        const videoFilePath = this.getVideoFilePath(title);
        return ytdl(youtubeUrl).pipe(fs.createWriteStream(videoFilePath));
    }

    public static async deleteVideo(id: string) {
        const videoFilePath = this.getVideoFilePath(id);
        await fs.unlink(videoFilePath);
    }

}

// const getVideoFileTitle = (youtubeUrl: string) => {
//     try {
//         return ytdl.getURLVideoID(youtubeUrl);
//     } catch(err) {
//         console.error(err);
//         return ''
//     }
// }

// const getVideoFilePath = (youtubeUrl: string) => {
//     const title = getVideoFileTitle(youtubeUrl);
//     return `${process.cwd()}/${videosDirectory}/${title}.mp4`;
// }

// const isValidUrl = (youtubeUrl: string) => {
//     return ytdl.validateURL(youtubeUrl);
// }

// const downloadVideo = (youtubeUrl: string) => {
//     const videoFilePath = getVideoFilePath(youtubeUrl);
//     return ytdl(youtubeUrl).pipe(fs.createWriteStream(videoFilePath));
// }

// const deleteVideo = async (youtubeUrl: string) => {
//     const videoFilePath = getVideoFilePath(youtubeUrl);
//     if(fs.existsSync(videoFilePath)) {
//         await fs.unlink(videoFilePath);
//     }
// }

// module.exports = {
//     isValidUrl,
//     downloadVideo,
//     deleteVideo
// }