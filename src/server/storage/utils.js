var sqlite3 = require('sqlite3').verbose();

var Storage = {}

Storage.get = function(key) {
    return new Promise(function(resolve, reject) {
        var db = new sqlite3.Database(__dirname + '/music.db');
        var isPlaylistsQuery = key === 'Playlists';
        var queryString = isPlaylistsQuery
            ? `SELECT p.id AS id, name, sp.song_id AS songId FROM ${key} as p, Songs_Playlists as sp WHERE p.id=sp.playlist_id`
            : `SELECT * FROM ${key}`;

        var dataKey = key.toLowerCase();
        var data = {};
        data[dataKey] = [];

        db.each(queryString, function(err, row) {
            if (err) {
                reject(err);
            }
            data[dataKey].push(row);
        }, function(err) {
            if (err) {
                db.close();
                reject(err);
            }
            db.close();
            if (isPlaylistsQuery) {
                var playlistData = {
                    playlists:[]
                };
                data[dataKey].forEach(function(playlist) {
                    var lastPlaylist = playlistData.playlists[playlistData.playlists.length - 1];
                    if (lastPlaylist && lastPlaylist.id === playlist.id) {
                        lastPlaylist.songs.push(playlist.songId);
                    } else {
                        playlist.songs = [playlist.songId];
                        delete playlist.songId;
                        playlistData.playlists.push(JSON.parse(JSON.stringify(playlist)));
                    }
                });
                resolve(playlistData);
            } else {
                resolve(data);
            }
        });
    });
};

module.exports = Storage;
