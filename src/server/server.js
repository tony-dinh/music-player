var fs = require('fs');
var http = require('http');
var port = process.env.PORT || 3000;

var CLIENT_DIR = __dirname + '/../client';
var API_DIR = __dirname + '/api';
var VENDOR_DIR = __dirname + '/../app/js/vendor';
var ASSET_DIR = CLIENT_DIR + '/assets';
var INDEX_PATH = CLIENT_DIR + '/index.html';
var STYLES_PATH = CLIENT_DIR + '/style.css';
var JS_PATH = CLIENT_DIR + '/music-app.js';

// GET
var serveGET = function(url, response) {
    response.statusCode = 200;
    switch (url) {
        case '/':
            response.statusCode = 301;
            response.setHeader('Location', '/playlists');
            response.end();
            break;
        case '/library':
            response.setHeader('Content-Type', 'text/html');
            fs.readFile(INDEX_PATH, function(err, data) {
                response.end(data);
            });
            break;
        case '/playlists':
            response.setHeader('Content-Type', 'text/html');
            fs.readFile(INDEX_PATH, function(err, data) {
                response.end(data);
            });
            break;
        case '/search':
            response.setHeader('Content-Type', 'text/html');
            fs.readFile(INDEX_PATH, function(err, data) {
                response.end(data);
            });
            break;
        case '/style.css':
            response.setHeader('Content-Type', 'text/css');
            fs.readFile(STYLES_PATH, function(err, data) {
                response.end(data);
            });
            break;
        case '/music-app.js':
            response.setHeader('Content-Type', 'application/javascript');
            fs.readFile(JS_PATH, function(err, data) {
                response.end(data);
            });
            break;
        case '/assets/song-art-200.jpg':
            response.setHeader('Content-Type', 'image/jpeg');
            fs.readFile(ASSET_DIR + '/song-art-200.jpg', function(err, data) {
                response.end(data);
            });
            break;
        case '/assets/playlist-art-200.jpg':
            response.setHeader('Content-Type', 'image/jpeg');
            fs.readFile(ASSET_DIR + '/playlist-art-200.jpg', function(err, data) {
                response.end(data);
            });
            break;
        case '/app/js/vendor/jquery.min.js':
            response.setHeader('Content-Type', 'application/javascript');
            fs.readFile(VENDOR_DIR + '/jquery.min.js', function(err, data) {
                if (err) {
                    console.log(err);
                }
                response.end(data);
            });
            break;
        case '/api/playlists':
            response.setHeader('Content-Type', 'application/json');
            fs.readFile(API_DIR + '/playlists.json', function(err, data) {
                response.end(data)
            });
            break;
        case '/api/songs':
            response.setHeader('Content-Type', 'application/json');
            fs.readFile(API_DIR + '/songs.json', function(err, data) {
                response.end(data)
            });
            break;
        default:
            response.statusCode = 404;
            response.end();
            break;
    }
};

// Create a server and provide it a callback to be executed for every HTTP request
// coming into localhost:3000.
var server = http.createServer(function(request, response) {
    console.log('')
    console.log('******');
    console.log(request.method + ' ' + request.url);
    console.log('******');
    console.log('')

    if (request.method === 'GET') {
        serveGET(request.url, response);
    }
});

// Start the server on port 3000
server.listen(port, function(error) {
    if (error) {
        return console.log(error);
    }
    console.log('[ OK ] Music App is listening on port: ' + port + ' 👂 🎵');
});
