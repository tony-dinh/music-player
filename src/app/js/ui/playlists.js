import NavBar from '../components/nav-bar'

const _loadPlaylists = function() {
    if (!$.isArray(PLAYLISTS) || PLAYLISTS.length === 0) {
        return
    }
    // Clear all playlists
    const $playlist = $('#playlists').html('')
    PLAYLISTS.forEach(function(playlistObj) {
        const $playlistEl = UTILS.playlistElementFor(playlistObj)
        $playlist.append($playlistEl[0])
    });
}

const _bindEvents = function() {
    $('body').on('click', '.c-playlist__item', function(e) {
        e.stopPropagation()

        const $playlistDetailView = $('#playlist-details')
        const $selectedPlaylist = $(this)
        const playlistId = $selectedPlaylist.data('id')
        const playlistObj = UTILS.getObjWithId(PLAYLISTS, playlistId)

        const $playlistHeader = $('.c-playlist-details__heading-container h1')
        const $playlistSongList = $('#playlist-song-list').html('')

        $playlistHeader.text(playlistObj.name)
        $playlistDetailView.data('playlist-id', playlistId)

        playlistObj.songs.forEach((songId) => {
            const $songEl = UTILS.songElementFor(UTILS.getObjWithId(SONGS, songId))
            $playlistSongList.append($songEl[0])
        })
        NavBar.setTabViewActive($playlistDetailView)
    })
}

const PlaylistUI = function() {
    _loadPlaylists()
    _bindEvents()
}

export default PlaylistUI
