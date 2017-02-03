var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(__dirname + '/src/server/storage/music.db');
var fs = require('fs');

var SERVER_DIR = __dirname + '/src/server/';

var bulkInsertSongs = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile(`${SERVER_DIR}/data/songs.json`, function(err, data) {
            if (err) {
                reject(err);
            }
            var musicData = JSON.parse(data);
            var songsArr = musicData.songs;
            db.serialize(function() {
                db
                .run('BEGIN TRANSACTION')
                .run('DROP TABLE IF EXISTS songs')
                .run('CREATE TABLE songs ("id" INTEGER PRIMARY KEY, "album" VARCHAR(255), "title" VARCHAR(255), "artist" VARCHAR(255), "duration" INTEGER)');

                var statement = db.prepare('INSERT INTO songs (id, album, title, artist, duration) VALUES (?, ?, ?, ?, ?)');
                songsArr.forEach(function(song) {
                    statement.run([song.id, song.album, song.title, song.artist, song.duration]);
                });
                statement.finalize();

                db.run('COMMIT');
                resolve();
            });
        });

    });
};

var bulkInsertPlaylists = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile(`${SERVER_DIR}/data/playlists.json`, function(err, data) {
            if (err) {
                reject(err);
            }
            var musicData = JSON.parse(data);
            var playlistArr = musicData.playlists;
            db.serialize(function() {
                db
                .run('BEGIN TRANSACTION')
                .run('DROP TABLE IF EXISTS playlists')
                .run('DROP TABLE IF EXISTS songs_playlists')
                .run('CREATE TABLE playlists ("id" INTEGER PRIMARY KEY, "name" VARCHAR(255))')
                .run('CREATE TABLE songs_playlists ("id" INTEGER PRIMARY KEY, "playlist_id" INTEGER, "song_id" INTEGER, FOREIGN KEY(playlist_id) REFERENCES playlists(id), FOREIGN KEY(song_id) REFERENCES songs(id))');

                var playlistStatement = db.prepare('INSERT INTO playlists (id, name) VALUES (?, ?)')
                var songsPlaylistStatement = db.prepare('INSERT INTO songs_playlists (id, playlist_id, song_id) VALUES (NULL, ?, ?)')
                playlistArr.forEach(function(playlist) {
                    playlistStatement.run([playlist.id, playlist.name]);
                    playlist.songs.forEach(function(songId) {
                        songsPlaylistStatement.run([playlist.id, songId]);
                    });
                });
                playlistStatement.finalize();
                songsPlaylistStatement.finalize();

                db.run('COMMIT');
                resolve();
            });
        });

    });
};

var errorHandler = function(err) {
    console.log('[ !! ] Database initialization error. ', err);
};

var populateInitialDB = function() {
    bulkInsertSongs()
    .then(bulkInsertPlaylists)
    .catch(errorHandler)
    .then(function() {
        db.close();
    });
};

populateInitialDB();
