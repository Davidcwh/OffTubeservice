import { Express } from "express"

const controller = require('./controller')

module.exports = (app: Express) => {
    app.post('/download', controller.postDownload),
    app.get('/getVideo/:id', controller.getDownload)
}