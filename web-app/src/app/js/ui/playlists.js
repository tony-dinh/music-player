import Events from '../global/events'
import Request from '../global/request'

import { NavBar } from '../components/nav-bar'
import { AddPlaylistForm, AddPlaylistFormUI } from '../components/add-playlist-form'
import { UserSelector } from '../components/user-selector'

const Playlists = {}

Playlists.add = function(playlistObj) {
    const $playlist = $('#playlists')
    const $playlistEl = UTILS.playlistElementFor(playlistObj)
    $playlist.append($playlistEl[0])
}

const _loadPlaylists = function() {
    if (!$.isArray(PLAYLISTS) || PLAYLISTS.length === 0) {
        return
    }
    // Clear all playlists
    $('#playlists').html('')
    PLAYLISTS.forEach(Playlists.add);
}

const _bindEvents = function() {
    const $body = $('body')

    $body.on('click', '.c-playlist__item', function(e) {
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

    $body.on('click', '#playlist-button', function(e) {
        AddPlaylistForm.show()
    })

    $body.on('click', '#user-button', function(e) {
        const playlistDetailsId = $('#playlist-details').data('playlist-id')
        UserSelector.showSelectionFor(playlistDetailsId)
    })

    $body.on('click', '#playlist-song-list .js-remove-from-playlist', function(e) {
        const $songEl = $(this).closest('.c-library__item')
        const songId = $songEl.data('id')
        const playlistId = $('#playlist-details').data('playlist-id')

        Request.removeSongFromPlaylist(songId, playlistId)
            .then(function() {
                const playlistObj = UTILS.getObjWithId(PLAYLISTS, playlistId)
                UTILS.removeSongFromPlaylist(songId, playlistObj)
                $songEl.remove()
            })
            .catch(function(err) {
                console.log(err)
            })
    })

    $body.on(Events.names.PLAYLIST_ADDED, function(e, playlistObj) {
        Playlists.add(playlistObj)
    })

    $body.on(Events.names.PLAYLISTS_UPDATED, _loadPlaylists)
}

const PlaylistsUI = function() {
    AddPlaylistFormUI()
    _bindEvents()
}

export default PlaylistsUI
