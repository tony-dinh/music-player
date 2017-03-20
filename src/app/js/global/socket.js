import io from 'socket.io-client'
import Events from './events'

const Socket = {}

Socket.events = {
    PLAYLIST_SONG_ADDED: '@@playlist/SONG_ADDED',
    PLAYLIST_SONG_DELETED: '@@playlist/SONG_DELETED'
};

Socket.log = function(message) {
    console.log(`[ SOCKET ] ${message}`);
}

Socket.connect = function() {
    this.socket = io.connect('/')
    this.socket.on('connect', () => this.log(`Connected.`))
    this.socket.on('event', _socketEventHandler)
}

const _socketEventHandler = (data) => {
    const jsonData = JSON.parse(data)
    const playlistObj = jsonData.playlist
        ? UTILS.getObjWithId(PLAYLISTS, jsonData.playlist)
        : null

    Socket.log(`${jsonData.event} triggered.`)

    switch(jsonData.event) {
        case Socket.events.PLAYLIST_SONG_ADDED:
            if (!UTILS.addSongToPlaylist(jsonData.song, playlistObj)) return
            Events.trigger(Events.names.PLAYLIST_SONG_ADDED, {playlistId: jsonData.playlist, songId: jsonData.song})
            return

        case Socket.events.PLAYLIST_SONG_DELETED:
            UTILS.removeSongFromPlaylist(jsonData.song, playlistObj)
            Events.trigger(Events.names.PLAYLIST_SONG_DELETED, {playlistId: jsonData.playlist, songId: jsonData.song})
            return

        default:
            break;
    }
}

export default Socket