import Events from '../global/events'
import Request from '../global/request'

import Overlay from './overlay'

const LIST_SEL_SELECTOR = '.js-playlist-selector'
const PLAYLIST_LIST_SELECTOR = '#playlist-list-selector'
const HIDDEN_CLASS = 'u-hidden'

const PlaylistSelector = {}

PlaylistSelector.showSelectionFor = function(songId) {
    // We don't want the content behind the overlay to be scrollable
    $('body').addClass('u-no-scroll')
    Overlay.show()

    const $playlistSel = $(LIST_SEL_SELECTOR)
    $playlistSel.removeClass(HIDDEN_CLASS).data('song-id', songId)
}

PlaylistSelector.hide = function() {
    $('body').removeClass('u-no-scroll')
    Overlay.hide()
}

PlaylistSelector.addPlaylist = function(playlistObj) {
    const $playlistList = $(PLAYLIST_LIST_SELECTOR)
    const $selectorEl = $('<li></li>')
    const selectorClass = 'c-list-selector__item'

    $selectorEl
        .addClass(selectorClass)
        .text(playlistObj.name)
        .data('id', playlistObj.id)

    $playlistList.append($selectorEl[0])
}

const _addPlaylists = function() {
    if (!$.isArray(PLAYLISTS) || PLAYLISTS.length === 0) {
        return
    }
    const $playlistList = $(PLAYLIST_LIST_SELECTOR)
    $playlistList.html('')
    PLAYLISTS.forEach(PlaylistSelector.addPlaylist)
}

const _bindEvents = function() {
    const $body = $('body')
    const $playlistSel = $(LIST_SEL_SELECTOR)
    const $listSelCloseBtn = $('.js-playlist-selector .c-list-selector__close-button')

    $listSelCloseBtn.on('click', function(e) {
        e.stopPropagation()
        PlaylistSelector.hide()
    })

    $body.on('click', '.js-playlist-selector .c-list-selector__item', function(e) {
        e.stopPropagation()
        const selectedSongId = $playlistSel.data('song-id')
        const selectedPlaylistId = $(this).data('id')
        const playlistObj = UTILS.getObjWithId(PLAYLISTS, selectedPlaylistId)
        if (!playlistObj.songs.includes(parseInt(selectedSongId))) {
            Request.addSongToPlaylist(selectedSongId, selectedPlaylistId)
                .then(function() {
                    UTILS.addSongToPlaylist(selectedSongId, playlistObj)
                })
                .catch(function(err) {
                    console.log(err)
                })
        }
        PlaylistSelector.hide()
    })

    $body.on(Events.names.PLAYLIST_ADDED, function(e, playlistObj) {
        PlaylistSelector.addPlaylist(playlistObj)
    })

    $body.on(Events.names.PLAYLIST_SELECTOR_UPDATE_NEEDED, function() {
        _addPlaylists()
    })
}

const PlaylistSelectorUI = function() {
    _bindEvents()
}

export { PlaylistSelector, PlaylistSelectorUI }
