var fs = require('fs');
var http = require('http');
var port = process.env.PORT || 3000;

var CLIENT_DIR = __dirname + '/../client';
var SERVER_DIR = __dirname;
var VENDOR_DIR = __dirname + '/../app/js/vendor';

// TODO: Make server responses scalable
// var serveGET = function(url, response) {
//     response.statusCode = 200;
//     if (/^\/api\//.test(url)) {
//         response.setHeader('Content-Type', 'application/json');
//         fs.readFile(SERVER_DIR + url + '.json', function(err, data) {
//             response.end(data)
//         });
//     } else if (/^\/assets\/*\.jpg/.test(url)) {
//         response.setHeader('Content-Type', 'image/jpeg');
//         fs.readFile(CLIENT_DIR + url, function(err, data) {
//             response.end(data);
//         });
//         return;
//     } else if (/\/vendor\/.*\.js/.test(url)) {
//         response.setHeader('Content-Type', 'application/javascript');
//         fs.readFile(VENDOR_DIR + '/jquery.min.js', function(err, data) {
//             response.end(data);
//         });
//     }
// }
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
            fs.readFile(CLIENT_DIR + '/index.html', function(err, data) {
                response.end(data);
            });
            break;
        case '/playlists':
            response.setHeader('Content-Type', 'text/html');
            fs.readFile(CLIENT_DIR + '/index.html', function(err, data) {
                response.end(data);
            });
            break;
        case '/search':
            response.setHeader('Content-Type', 'text/html');
            fs.readFile(CLIENT_DIR + '/index.html', function(err, data) {
                response.end(data);
            });
            break;
        case '/style.css':
            response.setHeader('Content-Type', 'text/css');
            fs.readFile(CLIENT_DIR + url, function(err, data) {
                response.end(data);
            });
            break;
        case '/music-app.js':
            response.setHeader('Content-Type', 'application/javascript');
            fs.readFile(CLIENT_DIR + url, function(err, data) {
                response.end(data);
            });
            break;
        case '/assets/song-art-200.jpg':
            response.setHeader('Content-Type', 'image/jpeg');
            fs.readFile(CLIENT_DIR + url, function(err, data) {
                response.end(data);
            });
            break;
        case '/assets/playlist-art-200.jpg':
            response.setHeader('Content-Type', 'image/jpeg');
            fs.readFile(CLIENT_DIR + url, function(err, data) {
                response.end(data);
            });
            break;
        case '/app/js/vendor/jquery.min.js':
            response.setHeader('Content-Type', 'application/javascript');
            fs.readFile(VENDOR_DIR + '/jquery.min.js', function(err, data) {
                response.end(data);
            });
            break;
        case '/api/playlists':
            response.setHeader('Content-Type', 'application/json');
            fs.readFile(SERVER_DIR + url + '.json', function(err, data) {
                response.end(data)
            });
            break;
        case '/api/songs':
            response.setHeader('Content-Type', 'application/json');
            fs.readFile(SERVER_DIR + url + '.json', function(err, data) {
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
