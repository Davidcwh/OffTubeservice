const controller = require('./controller')

module.exports = app => {
    app.post('/download', controller.postDownload),
    app.get('/getVideo/:id', controller.getDownload)
}