var fs = require('fs');
var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

var STORAGE = require('../storage/utils');
var CLIENT_DIR = `${__dirname}/../client`;

var status = {
    OK: 200,
    MOVED_PERMANENTLY: 301,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
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

// MIDDLEWARE
// ---

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
app.get('/', function(request, response) {
    response.redirect(status.MOVED_PERMANENTLY, '/playlists');
});

// HTML
app.get(/^\/(playlists|library|search)$/, function(request, response) {
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
app.post('/api/:searchKey(songs|playlists)', function(request, response) {
    // Future Task
    response.sendStatus(status.INTERNAL_ERROR);
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
