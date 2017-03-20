var fs = require('fs');
var crypto = require('crypto');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var app = express();

var server = require('http').Server(app);
var Socket = require('./socket');

var STORAGE = require('../storage/utils');
var CLIENT_DIR = `${__dirname}/../client`;

var status = {
    OK: 200,
    MOVED_PERMANENTLY: 301,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
};

var generateKey = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
};

var sendFile = function(rootDir, relPath, response) {
    var options = {
        root: rootDir,
        headers: {
            'Cache-Control': 'max-age=1800'
        }
    };
    response.sendFile(relPath, options, function(err) {
        if (err) {
            console.log(err);
            response.sendStatus(err.status);
        }
    });
};

var checkAuthorization = function(request, response, next) {
    if (request.url === '/login') {
        return next();
    }
    STORAGE.checkActiveSession({sessionKey: request.cookies.sessionKey})
        .then(function(session) {
            request.sessionUser = session.sessionUser;
            next();
        });
};

var redirectMiddleware = function(request, response, next) {
    if (/^\/login$/.test(request.url)) return next();
    if (!request.sessionUser) return response.redirect(status.MOVED_PERMANENTLY, '/login');
    if (request.sessionUser && /^\/$/.test(request.url)) response.redirect(status.MOVED_PERMANENTLY, '/playlists');
    if (request.sessionUser) return next();
};

var jsonBodyParser = bodyParser.json()

// SOCKETS
// ---
Socket.open(server);

// MIDDLEWARE
// ---
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(request, response, next) {
    console.log(`\n[ ${request.method} ] ${request.url}\n`);
    next();
});

// GET
// ---

// APIs
app.get('/api/:searchKey(songs|playlists)', checkAuthorization, function(request, response) {
    var successHandler = function(data) {
        response.status(status.OK).json(data);
    };
    var rejectHandler = function(err) {
        console.log(err);
        response.sendStatus(status.INTERNAL_ERROR);
    };
    STORAGE.get(request.params.searchKey, request.sessionUser)
        .then(successHandler)
        .catch(rejectHandler);
});

app.get('/api/users', checkAuthorization, function(request, response) {
        if (!request.sessionUser) {
        return response.sendStatus(status.FORBIDDEN)
    }
    STORAGE.getOtherUsers(request.sessionUser)
        .then(function(users) {
            response.status(status.OK).json({users: users})
        })
});

// Assets
app.get(/^\/assets\/[^\/]*\.jpg$/, function(request, response) {
    sendFile(CLIENT_DIR, request.url, response);
});

// Redirect
app.get('/', checkAuthorization, redirectMiddleware);

// HTML
app.get(/^\/(login|playlists|library|search)$/, checkAuthorization, redirectMiddleware,function(request, response) {
    sendFile(CLIENT_DIR, 'index.html', response);
});

// Client Files
app.get('/:filename(music-app.js|style.css)', function(request, response) {
    sendFile(CLIENT_DIR, request.url, response);
});

// Vendor
app.get(/\/vendor\/.*\.js/, function(request, response) {
    sendFile(`${CLIENT_DIR}/..`, request.url, response);
});

// POST
// ---
app.post('/api/playlists', jsonBodyParser, checkAuthorization, function(request, response) {
    if (!request.sessionUser) {
        return response.sendStatus(status.FORBIDDEN)
    }

    STORAGE.addNewPlaylistForUser(request.body.name, request.sessionUser)
        .then(function(playlistInstance) {
            var playlist = {
                id: playlistInstance.id,
                name: request.body.name
            };
            response.json(playlist);
        })
        .catch(function(err) {
            console.log(err.message);
            response.sendStatus(status.INTERNAL_ERROR);
        });
});

app.post('/api/playlists/:playlistId([0-9]+)', jsonBodyParser, checkAuthorization, function(request, response) {
    if (!request.sessionUser) {
        return response.sendStatus(status.FORBIDDEN)
    }

    STORAGE.userHasPlaylistPermission(request.sessionUser, request.params.playlistId)
        .then(function(hasPermission) {
            if (!hasPermission) {
                return response.sendStatus(status.FORBIDDEN)
            }
            STORAGE.addSongToPlaylist(request.params.playlistId, parseInt(request.body.song))
                .then(function() {
                    Socket.emitEvent({
                        room: `${request.params.playlistId}`,
                        data: {
                            event: Socket.events.PLAYLIST_SONG_ADDED,
                            song: request.body.song,
                            playlist: request.params.playlistId
                        }
                    });
                    response.sendStatus(status.OK);
                })
                .catch(function(err) {
                    console.log(err.message);
                    response.sendStatus(status.INTERNAL_ERROR);
                });
        })
});

app.post('/api/playlists/:playlistId([0-9]+)/users', jsonBodyParser, checkAuthorization, function(request, response) {
    if (!request.sessionUser) {
        return response.sendStatus(status.FORBIDDEN)
    }

    STORAGE.grantUserPermissionForPlaylist({
        userId: request.body.user,
        playlistId: request.params.playlistId
    }).then(function() {
        response.sendStatus(status.OK)
    }).catch(function() {
        response.sendStatus(status.INTERNAL_ERROR)
    })
});

app.post('/login', jsonBodyParser, function(request, response) {
    if (!request.body.username || !request.body.password) {
        return response.sendStatus(status.UNAUTHORIZED);
    }

    STORAGE.checkValidLogin({
        username: request.body.username,
        password: request.body.password
    }).then(function(user) {
        if (user.isValid) {
            const sessionKey = generateKey();
            STORAGE.addSession({sessionKey: sessionKey, sessionUser: user.id})
                .then(function() {
                    response.setHeader('Set-Cookie', `sessionKey=${sessionKey}`)
                    response.sendStatus(status.OK)
                })
        } else {
            response.sendStatus(status.UNAUTHORIZED)
        }
    })
});


// DELETE
// ---
app.delete('/playlists/:playlistId([0-9]+)', jsonBodyParser, checkAuthorization, function(request, response) {
    if (!request.sessionUser) {
        return response.sendStatus(status.FORBIDDEN)
    }
    STORAGE.userHasPlaylistPermission(request.sessionUser, request.params.playlistId)
        .then(function(hasPermission) {
            if (!hasPermission) {
                return response.sendStatus(status.FORBIDDEN)
            }
            STORAGE.deleteSongFromPlaylist(request.params.playlistId, parseInt(request.body.song))
                .then(function() {
                    Socket.emitEvent({
                        room: `${request.params.playlistId}`,
                        data: {
                            event: Socket.events.PLAYLIST_SONG_DELETED,
                            song: request.body.song,
                            playlist: request.params.playlistId
                        }
                    });
                    response.sendStatus(status.OK);
                })
                .catch(function(err) {
                    console.log(err.message);
                    response.sendStatus(status.INTERNAL_ERROR);
                });
        })
});

// Start the server on port 3000
STORAGE.sync().then(function() {
    server.listen(port, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log(`[ OK ] Music App is listening on port: ${port} 👂 🎵`);
    });
});
