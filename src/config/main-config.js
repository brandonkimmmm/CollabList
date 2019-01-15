require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');

module.exports = {
    init(app, express) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
    }
}