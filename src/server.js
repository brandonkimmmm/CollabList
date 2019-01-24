const app = require('./app');
const http = require('http');
const express = require('express');
const path = require('path');

const port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
const io = require('socket.io').listen(server);

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

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

server.on('listening', () => {
    console.log(`server is listening for requests on port ${server.address().port}`);
})

io.on('connection', (client) => {

    client.on('ADD_MEMBER', function(data){
        io.emit('MEMBER_ADDED', data);
    })

    client.on('REMOVE_MEMBER', function(data) {
        io.emit('MEMBER_REMOVED', data);
    })

    client.on('ADD_LIST', function(data) {
        io.emit('LIST_ADDED', data);
    })

    client.on('ADD_ITEM', function(data) {
        console.log(data);
    })

    client.on('disconnect', () => {
        console.log('user disconnect');
    })

    client.on('error', (err) => {
        console.log(err);
    })
})