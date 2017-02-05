var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(`${__dirname}/src/server/storage/music.db`);
var fs = require('fs');

var SERVER_DIR = `${__dirname}/src/server/`;

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
                .run('DROP TABLE IF EXISTS Songs')
                .run('CREATE TABLE Songs ("id" INTEGER PRIMARY KEY, "album" VARCHAR(255), "title" VARCHAR(255), "artist" VARCHAR(255), "duration" INTEGER)');

                // Insert NULL to auto increment ids
                var statement = db.prepare('INSERT INTO Songs (id, album, title, artist, duration) VALUES (NULL, ?, ?, ?, ?)');
                songsArr.forEach(function(song) {
                    statement.run([song.album, song.title, song.artist, song.duration]);
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
                .run('DROP TABLE IF EXISTS Playlists')
                .run('DROP TABLE IF EXISTS Songs_Playlists')
                .run('CREATE TABLE Playlists ("id" INTEGER PRIMARY KEY, "name" VARCHAR(255))')
                .run('CREATE TABLE Songs_Playlists ("id" INTEGER PRIMARY KEY, "playlist_id" INTEGER, "song_id" INTEGER, FOREIGN KEY(playlist_id) REFERENCES Playlists(id), FOREIGN KEY(song_id) REFERENCES Songs(id))');

                // Insert NULL to auto increment ids
                var playlistStatement = db.prepare('INSERT INTO Playlists (id, name) VALUES (NULL, ?)');
                var songsPlaylistStatement = db.prepare('INSERT INTO Songs_Playlists (id, playlist_id, song_id) VALUES (NULL, ?, ?)');
                playlistArr.forEach(function(playlist) {
                    playlistStatement.run([playlist.name]);
                    playlist.songs.forEach(function(songId) {
                        songsPlaylistStatement.run([playlist.id + 1, songId + 1]);
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
