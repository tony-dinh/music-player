var sqlite3 = require('sqlite3').verbose();
var models = require('./models');
var Storage = {};

Storage.sync = function() {
    return models.sequelize.sync();
};

Storage.get = function(key, userId) {
    if (key === 'songs') {
        return Storage.getSongs();
    } else if (key === 'playlists') {
        return Storage.getPlaylistsForUser(userId);
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

Storage.getPlaylistsForUser = function(userId) {
    if (!userId) {
        return Promise.resolve({playlists:[]})
    }

    return models.User.findById(userId)
        .then((userInstance) => userInstance.getPlaylists({ attributes: ['id', 'name'] }))
        .then((userPlaylists) => {
            return Promise.all(
                userPlaylists.map((playlistInstance) => {
                    return Storage.getSongsForPlaylistInstance(playlistInstance)
                        .then(function(songIds) {
                            return {
                                id: playlistInstance.id,
                                name: playlistInstance.name,
                                songs: songIds
                            };
                        });
                })
            )
        })
        .then((playlistArr) => {
            return {playlists: playlistArr}
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

Storage.addSongToPlaylist = function(playlistId, songId) {
    return models.Playlist.findById(playlistId)
        .then(function(playlistInstance) {
            return playlistInstance.addSong(songId);
        });
};

Storage.addNewPlaylist = function(playlist) {
    return models.Playlist.create(playlist, {fields: ['name']});
};

Storage.deleteSongFromPlaylist = function(playlistId, songId) {
    return models.Playlist.findById(playlistId)
        .then(function(playlistInstance) {
            return playlistInstance.removeSong(songId);
        });
};

Storage.checkValidLogin = function(loginInfo) {
    return models.User.findOne({
        where: {
            "username": loginInfo.username
        }
    }).then(function(userInstance) {
        if (!userInstance || userInstance.password !== loginInfo.password) {
            return {isValid: false}
        }
        return {id: userInstance.id, isValid: true}
    });
};

Storage.checkActiveSession = function(session) {
    if (!session.sessionKey) {
        return Promise.resolve({isActive: false});
    }

    return new Promise(function(resolve, reject) {
        models.Session.findOne({
            where: {
                "sessionKey": session.sessionKey
            }
        }).then(function(sessionInstance) {
            const session = {isActive: !!sessionInstance};
            session.sessionUser = sessionInstance
                ? sessionInstance.sessionUser
                : null;

            resolve(session);
        });
    });
};

Storage.addSession = function(session) {
    return models.Session.create(session);
};

module.exports = Storage;
