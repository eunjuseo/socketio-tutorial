var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res, next) => {
    res.sendFile(__dirname+'/src/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

io.emit('some event', {
    someProperty: 'some value',
    otherProperty: 'other value'
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});