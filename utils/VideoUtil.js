// encapsulates video management code - video url validation, video downloading, deleting etc

const ytdl = require('ytdl-core');
const fs = require('fs')
const videosDirectory = 'downloads';

const getVideoFileTitle = (youtubeUrl) => {
    try {
        return ytdl.getURLVideoID(youtubeUrl);
    } catch(err) {
        console.error(err);
        return ''
    }
}

const getVideoFilePath = (youtubeUrl) => {
    const title = getVideoFileTitle(youtubeUrl);
    return `${process.cwd()}/${videosDirectory}/${title}.mp4`;
}

const isValidUrl = (youtubeUrl) => {
    return ytdl.validateURL(youtubeUrl);
}

const downloadVideo = (youtubeUrl) => {
    const videoFilePath = getVideoFilePath(youtubeUrl);
    return ytdl(youtubeUrl).pipe(fs.createWriteStream(videoFilePath));
}

const deleteVideo = (youtubeUrl) => {
    const videoFilePath = getVideoFilePath(youtubeUrl);
    if(fs.existsSync(videoFilePath)) {
        await fs.unlink(videoFilePath);
    }
}

module.exports = {
    isValidUrl,
    downloadVideo,
    deleteVideo
}