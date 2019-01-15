require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');

module.exports = {
    init(app, express) {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        // if (process.env.NODE_ENV === 'production') {
            // Serve any static files
            app.use(express.static(path.join(__dirname, 'client/build')));

            // Handle React routing, return all requests to React app
            app.get('*', function(req, res) {
                res.sendFile(path.join(__dirname, 'client/build/index.html'));
            });
        // }
    }
}