var sqlite3 = require('sqlite3').verbose();
var models = require('./models');
var Storage = {};

Storage.sync = function() {
    return models.sequelize.sync();
};

Storage.get = function(key) {
    if (key === 'songs') {
        return Storage.getSongs();
    } else if (key === 'playlists') {
        return Storage.getPlaylists();
    } else {
        return Promise.reject(new Error(`Invalid request: get(${key})`));
    }
};

Storage.getSongs = function() {
    return models.Song.findAll()
        .then(function(songs) {
            var songsArr = songs.map(function(songInstance) {
                return {
                    id: songInstance.id,
                    album: songInstance.album,
                    title: songInstance.title,
                    artist: songInstance.artist,
                    duration: songInstance.duration
                };
            });
            return { songs: songsArr };
        });
};

Storage.getPlaylists = function() {
    return models.Playlist.findAll()
        .then(function(playlists) {
            // Promise an array of playlist objects
            return Promise.all(
                playlists.map(function(playlistInstance) {
                    return Storage.getSongsForPlaylistInstance(playlistInstance)
                        .then(function(songIds) {
                            return {
                                id: playlistInstance.id,
                                name: playlistInstance.name,
                                songs: songIds
                            };
                        });
                })
            );
        })
        .then(function(playlistArr) {
            return { playlists: playlistArr };
        })
};

Storage.getSongsForPlaylistInstance = function(playlistInstance) {
    return playlistInstance.getSongs({ attributes: ['id'] })
        .then(function(songs) {
            return songs.map(function(songInstance) {
                return songInstance.id;
            })
        });
};

module.exports = Storage;
