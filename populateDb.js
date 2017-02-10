var STORAGE_DIR = './src/storage';
var DATA_DIR = `${STORAGE_DIR}/data`;

var fs = require('fs');
var models = require(`${STORAGE_DIR}/models`);

var populateSongs = function() {
    return new Promise (function(resolve, reject) {
        fs.readFile(`${DATA_DIR}/songs.json`, function(err, data) {
            if (err) {
                reject(err);
            }
            var musicData = JSON.parse(data);
            var songs = musicData.songs;

            // Excluding 'id' from fields to allow for auto incrementation
            models.Song.bulkCreate(songs, {fields: ['album', 'title', 'artist', 'duration']})
                .then(resolve)
                .catch(reject);
        });
    });
};

var populatePlaylists = function() {
    return new Promise (function(resolve, reject) {
        fs.readFile(`${DATA_DIR}/playlists.json`, function(err, data) {
            if (err) {
                reject(err);
            }
            var promiseArr = [];
            var musicData = JSON.parse(data);
            var playlists = musicData.playlists;

            playlists.forEach(function(playlist) {
                var associatePromise = models.Playlist.create(playlist, {fields: ['name']})
                    .then(function(playlistInstance) {
                        return playlistInstance.setSongs(playlist.songs);
                    })
                    .catch(reject);
                promiseArr.push(associatePromise);
            });
            // Wait for all association promises to resolve
            Promise.all(promiseArr).then(resolve);
        });
    });
};

models.sequelize.sync({force: true}).then(function() {
    populateSongs()
        .then(populatePlaylists)
        .then(function() {
            console.log('[ OK ] Database successfully populated.');
        }, function(err) {
            console.log('[ !! ] Database initialization error. ', err);
        });
});
