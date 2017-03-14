var fs = require('fs');
var crypto = require('crypto');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var app = express();

var STORAGE = require('../storage/utils');
var CLIENT_DIR = `${__dirname}/../client`;

var status = {
    OK: 200,
    MOVED_PERMANENTLY: 301,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
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

var isJSON = function(string) {
    try {
        JSON.parse(string);
        return true;
    } catch (e) {
        return false;
    }
};

var onRequestEnd = function(request, callback) {
    var body = '';
    request.on('data', function(data) {
        body += data;
    });

    request.on('end', function() {
        callback(body);
    });
}

var checkAuthorization = function(request, response, next) {
    if (request.url === '/login') {
        next()
    }

    STORAGE.checkActiveSession({sessionKey: request.cookies.sessionKey})
        .then(function(session) {
            if (!session.isActive) {
                return response.redirect(status.MOVED_PERMANENTLY, '/login');
            } else {
                if (request.url === '/') {
                    return response.redirect(status.MOVED_PERMANENTLY, '/playlists')
                }
                next()
            }
        });
};

// MIDDLEWARE
// ---

app.use(cookieParser());
app.use(function(request, response, next) {
    console.log(`\n[ ${request.method} ] ${request.url}\n`);
    next();
});

// GET
// ---

// APIs
app.get('/api/:searchKey(songs|playlists)', function(request, response) {
    var successHandler = function(data) {
        response.status(status.OK).json(data);
    };
    var rejectHandler = function(err) {
        console.log(err);
        response.sendStatus(status.INTERNAL_ERROR);
    };
    STORAGE.get(request.params.searchKey)
        .then(successHandler)
        .catch(rejectHandler);
});

// Assets
app.get(/^\/assets\/[^\/]*\.jpg$/, function(request, response) {
    sendFile(CLIENT_DIR, request.url, response);
});

// Redirect
app.get('/', checkAuthorization);

// HTML
app.get(/^\/(login|playlists|library|search)$/, checkAuthorization,function(request, response) {
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
app.post('/api/playlists', function(request, response) {
    onRequestEnd(request, function(body) {
        if (!isJSON(body)) {
            return response.sendStatus(status.BAD_REQUEST);
        }

        var playlistData = JSON.parse(body);
        if (typeof playlistData.name !== 'string') {
            return response.sendStatus(status.BAD_REQUEST);
        }

        STORAGE.addNewPlaylist(playlistData)
            .then(function(playlistInstance) {
                var playlist = {
                    id: playlistInstance.id,
                    name: playlistData.name
                };
                response.json(playlist);
            })
            .catch(function(err) {
                console.log(err.message);
                response.sendStatus(status.INTERNAL_ERROR);
            });
    });
});

app.post('/api/playlists/:playlistId([0-9]+)', function(request, response) {
    onRequestEnd(request, function(body) {
        if (!isJSON(body)) {
            return response.sendStatus(status.BAD_REQUEST);
        }

        var playlistData = JSON.parse(body);
        STORAGE.addSongToPlaylist(request.params.playlistId, parseInt(playlistData.song))
            .then(function() {
                response.sendStatus(status.OK);
            })
            .catch(function(err) {
                console.log(err.message);
                response.sendStatus(status.INTERNAL_ERROR);
            });
    });
});

app.post('/login', bodyParser.json(), function(request, response) {
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
                    response.redirect(status.MOVED_PERMANENTLY, '/playlists')
                })
        } else {
            response.sendStatus(status.UNAUTHORIZED)
        }
    })
});

// DELETE
// ---
app.delete('/playlists/:playlistId([0-9]+)', function(request, response) {
    onRequestEnd(request, function(body) {
        if (!isJSON(body)) {
            return response.sendStatus(status.BAD_REQUEST);
        }

        var playlistData = JSON.parse(body);
        STORAGE.deleteSongFromPlaylist(request.params.playlistId, parseInt(playlistData.song))
            .then(function() {
                response.sendStatus(status.OK);
            })
            .catch(function(err) {
                console.log(err.message);
                response.sendStatus(status.INTERNAL_ERROR);
            });
    });
});

// Start the server on port 3000
STORAGE.sync().then(function() {
    app.listen(port, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log(`[ OK ] Music App is listening on port: ${port} 👂 🎵`);
    });
});
