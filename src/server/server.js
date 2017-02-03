var fs = require('fs');
var express = require('express');
var http = require('http');
var port = process.env.PORT || 3000;

var STORAGE = require('./storage/utils');
var CLIENT_DIR = __dirname + '/../client';
var SERVER_DIR = __dirname;
var VENDOR_DIR = __dirname + '/../app/js/vendor';

var status = {
    OK: 200,
    MOVED_PERMANENTLY: 301,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
};

var isJSON = function(string) {
    try {
        JSON.parse(string);
        return true;
    } catch (e) {
        return false;
    }
};

var endResponse = function(response, statusCode, data) {
    response.statusCode = statusCode;
    response.end(data);
};

var writePlaylistData = function(request, response) {
    var body = '';
    request
    .on('data', function(data) {
        body += data;
    })
    .on('error', function(err) {
        endResponse(response, status.INTERNAL_ERROR);
    })
    .on('end', function () {
        if (!isJSON(body)) {
            return endResponse(response, status.BAD_REQUEST);
        }
        var filePath = SERVER_DIR + request.url + '.json';
        var json = JSON.stringify(JSON.parse(body), null, 2);
        fs.writeFile(filePath, json, function(err) {
            if (err) {
                return endResponse(response, status.INTERNAL_ERROR);
            }
            endResponse(response, status.OK);
        });
    });
};

var serveAPI = function(path, response) {
    response.setHeader('Content-Type', 'application/json');
    var keyMatches = path.match(/^\/api\/(songs|playlists)$/);
    var key = keyMatches
        ? keyMatches[1]
        : null;
    if (!key) {
        endResponse(response.INTERNAL_ERROR);
    }
    STORAGE.get(key)
        .then(function(data) {
            endResponse(response, status.OK, JSON.stringify(data));
        })
        .catch(function(err) {
            console.log(err);
            endResponse(response, status.INTERNAL_ERROR);
        });
};

var serveAsset = function(path, response) {
    response.setHeader('Content-Type', 'image/jpeg');
    response.setHeader('Cache-Control', 'max-age=1800');
    fs.readFile(path, function(err, data) {
        if (err) {
            return endResponse(response, status.NOT_FOUND);
        }
        endResponse(response, status.OK, data);
    });
};

var serveJS = function(path, response) {
    response.setHeader('Content-Type', 'application/javascript');
    response.setHeader('Cache-Control', 'max-age=1800');
    fs.readFile(path, function(err, data) {
        if (err) {
            return endResponse(response, status.NOT_FOUND);
        }
        endResponse(response, status.OK, data);
    });
};

var serveStyleSheet = function(path, response) {
    response.setHeader('Content-Type', 'text/css');
    response.setHeader('Cache-Control', 'max-age=1800');
    fs.readFile(path, function(err, data) {
        if (err) {
            return endResponse(response, status.NOT_FOUND);
        }
        endResponse(response, status.OK, data);
    });
};

var serveHTML = function(path, response) {
    response.setHeader('Content-Type', 'text/html');
    response.setHeader('Cache-Control', 'max-age=1800');
    fs.readFile(path, function(err, data) {
        if (err) {
            return endResponse(response, status.NOT_FOUND);
        }
        endResponse(response, status.OK, data);
    });
};

var serveRedirect = function(location, response) {
    response.setHeader('Location', '/playlists');
    response.setHeader('Cache-Control', 'max-age=1800');
    endResponse(response, status.MOVED_PERMANENTLY);
};

var serveGET = function(url, response) {
    // APIs
    if (/^\/api\/(songs|playlists)$/.test(url)) { serveAPI(url, response); }
    // Assets
    else if (/^\/assets\/.*\.jpg$/.test(url)) { serveAsset(CLIENT_DIR + url, response); }
    // Client JS
    else if (/^\/([^\/]*)\.js$/.test(url)) { serveJS(CLIENT_DIR + url, response); }
    // Client Styles
    else if (/^\/.*\.css$/.test(url)) { serveStyleSheet(CLIENT_DIR + url, response); }
    // HTML
    else if (/^\/(playlists|library|search)$/.test(url)) { serveHTML(CLIENT_DIR + '/index.html', response); }
    // Redirect
    else if (/^\/$/.test(url)) { serveRedirect('playlists', response); }
    // Vendor
    else if (/\/vendor\/.*\.js/.test(url)) { serveJS(CLIENT_DIR + '/..' + url, response); }
    // Default
    else { endResponse(response, status.NOT_FOUND); }
}

var servePOST = function(request, response) {
    if (/^\/api\/playlists$/.test(request.url)) writePlaylistData(request, response);
    else endResponse(response, status.NOT_FOUND);
};

// Create a server and provide it a callback to be executed for every HTTP request
// coming into localhost:3000.
var server = http.createServer(function(request, response) {
    if ( port === 3000) {
        console.log('\n******\n' + request.method + ' ' + request.url + '\n******\n')
    }
    switch (request.method) {
        case 'GET':
            serveGET(request.url, response);
            break;
        case 'POST':
            servePOST(request, response);
            break;
        default:
        endResponse(response, status.BAD_REQUEST);
    }
});

// Start the server on port 3000
server.listen(port, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log('[ OK ] Music App is listening on port: ' + port + ' 👂 🎵');
});
