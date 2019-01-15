const app = require('./app');
const http = require('http');

const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if(isNaN(port)) {
        return val;
    }
    if(port >= 0) {
        return port;
    }
    return false;
}

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build/index.html'));
    });
}

server.on('listening', () => {
    console.log(`server is listening for requests on port ${server.address().port}`);
})