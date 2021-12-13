import videoUtil from './utils/VideoUtil';

const postDownload = (req, res) => {
    const { youtubeUrl } = req.body;
    // check if youtubeUrl is valid
    if(!videoUtil.isValidUrl(youtubeUrl)) {
        return res.status(500).json('Invalid youtube Url given');
    }

    
};

const getDownload = (req, res) => {

};

module.exports = {
    postDownload,
    getDownload
}