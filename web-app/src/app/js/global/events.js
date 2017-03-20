const Events = {}
const $body = $('body')

Events.names = {
    MUSIC_LOADED: '@@music/LOADED',
    PLAYLISTS_UPDATE_NEEDED: '@@playlists/UPDATE_NEEDED',
    PLAYLIST_SELECTOR_UPDATE_NEEDED: '@@playlist-selector/UPDATE_NEEDED',
    PLAYLISTS_UPDATED: '@@playlists/UPDATED',
    PLAYLIST_ADDED: '@@playlist/ADDED',
    PLAYLIST_SONG_ADDED: '@@playlist/SONG_ADDED',
    PLAYLIST_SONG_DELETED: '@@playlist/SONG_ADDED',
    SIGNED_IN: '@@user/SIGNED_IN',
    SONGS_UPDATED: '@@songs/UPDATED'
}

Events.trigger = function(event, payload) {
    $body.trigger(event, payload)
}

export default Events
