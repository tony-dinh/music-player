const cookieParser = require('cookie-parser');
const STORAGE = require('../storage/utils');
const Socket = {};

Socket.clients = {};

Socket.events = {
    PLAYLIST_SONG_ADDED: '@@playlist/SONG_ADDED',
    PLAYLIST_SONG_DELETED: '@@playlist/SONG_DELETED'
};

Socket.log = function(message) {
    console.log(`\n[ SOCKET ] ${message}\n`);
};

Socket.open = function(server) {
    this.io = require('socket.io')(server);
    // Middleware to parse cookies
    this.io.use((socket, next) => {
        cookieParser()(socket.request, null, next)
    });
    this.io.on('connection', this._connect)
};

Socket._connect = function(socket) {
    const cookies = socket.request.cookies;
    if (cookies.sessionKey) {
        STORAGE.getUserForSession({
            sessionKey: cookies.sessionKey
        }).then((userInstance) => {
            return STORAGE.getRoomsForUser(userInstance)
        }).then((rooms) => {
            rooms.forEach((room) => {
                socket.join(room, () => Socket.log(`${cookies.sessionKey} Joined room ${room}`))
            });
        }).catch((err) => {
            Socket.log(`Unable to find user for session`)
        });

        Socket.clients[cookies.sessionKey] = socket
        socket.on('disconnect', () => {
            delete Socket.clients[cookies.sessionKey]
        })

        Socket.log(`User connected: ${cookies.sessionKey}.`);
    }
};

Socket.emitEvent = function({room, data}) {
    this.log(`Emitting to room: ${room} with data ${JSON.stringify(data, null, 2)}`);
    this.io.to(room).emit('event', JSON.stringify(data));
};

module.exports = Socket;