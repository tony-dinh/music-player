import Overlay from './overlay'

const LIST_SEL_SELECTOR = '.c-list-selector__container'
const PLAYLIST_LIST_SELECTOR = '#playlist-list-selector'
const HIDDEN_CLASS = 'u-hidden'

const PlaylistSelector = {}

PlaylistSelector.showSelectionFor = function(songId) {
    // We don't want the content behind the overlay to be scrollable
    $('body').addClass('u-no-scroll')
    Overlay.show()

    const $playlistSel = $(LIST_SEL_SELECTOR)
    $playlistSel.removeClass(HIDDEN_CLASS).attr('data-song-id', songId)
}

PlaylistSelector.hide = function() {
    $('body').removeClass('u-no-scroll')
    Overlay.hide()

    const $playlistSel = $(LIST_SEL_SELECTOR)
    $playlistSel.addClass(HIDDEN_CLASS)
}

PlaylistSelector.addPlaylist = function(playlistObj) {
    const $playlistList = $(PLAYLIST_LIST_SELECTOR)
    const $selectorEl = $('<li></li>')
    const selectorClass = 'c-list-selector__item'

    $selectorEl
        .addClass(selectorClass)
        .text(playlistObj.name)
        .attr('data-id', playlistObj.id)

    $playlistList.append($selectorEl[0])
}

const _bindEvents = function() {
    const $playlistSel = $(LIST_SEL_SELECTOR)
    const $listSelItems = $('.c-list-selector__item')
    const $listSelCloseBtn = $('.c-list-selector__close-button')

    $listSelCloseBtn.on('click', function(e) {
        e.stopPropagation()
        if (this === e.target) {
            PlaylistSelector.hide()
        }
    })

    $listSelItems.on('click', function(e) {
        e.stopPropagation()
        const selectedSongId = $playlistSel.data('song-id')
        const selectedPlaylistId = $(this).data('id')
        const playlistObj = Utils.getObjWithId(PLAYLISTS, selectedPlaylistId)

        UTILS.addSongToPlaylist(selectedSongId, playlistObj)
        PlaylistSelector.hide()
    })
}

const PlaylistSelectorUI = function() {
    if (!$.isArray(PLAYLISTS) || PLAYLISTS.length === 0) {
        return
    }
    PLAYLISTS.forEach(PlaylistSelector.addPlaylist)
    _bindEvents()
}

export { PlaylistSelector, PlaylistSelectorUI }
