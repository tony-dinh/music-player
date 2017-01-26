const OVERLAY_SELECTOR = '.c-overlay'
const LIST_SEL_SELECTOR = '#playlist-list-selector'
const VISIBLE_CLASS = 'c--visible'

const PlaylistSelector = {}

PlaylistSelector.showSelectionFor = function(songId) {
    // We don't want the content behind the overlay to be scrollable
    $('body').addClass('u-no-scroll')

    const $overlay = $(OVERLAY_SELECTOR)
    $overlay.addClass(VISIBLE_CLASS).attr('data-song-id', songId)
}

PlaylistSelector.hide = function() {
    $('body').removeClass('u-no-scroll')

    const $overlay = $(OVERLAY_SELECTOR)
    $overlay.removeClass(VISIBLE_CLASS)
}

PlaylistSelector.addPlaylist = function(playlistObj) {
    const $listSel = $(LIST_SEL_SELECTOR)
    const $selectorEl = $('<li></li>')
    const selectorClass = 'c-list-selector__item'

    $selectorEl
        .addClass(selectorClass)
        .text(playlistObj.name)
        .attr('data-id', playlistObj.id)

    $listSel.append($selectorEl[0])
}

const _bindEvents = function() {
    const $overlay = $(OVERLAY_SELECTOR)
    const $listSelItems = $('.c-list-selector__item')
    const $listSelCloseBtn = $('.c-list-selector__close-button')

    $overlay.on('click', function(e) {
        e.stopPropagation()
        if (this === e.target) {
            PlaylistSelector.hide()
        }
    })

    $listSelCloseBtn.on('click', function(e) {
        e.stopPropagation()
        if (this === e.target) {
            PlaylistSelector.hide()
        }
    })

    $listSelItems.on('click', function(e) {
        e.stopPropagation()
        const selectedSongId = $overlay.data('song-id')
        const selectedPlaylistId = $(this).data('id')
        const playlistObj = Utils.getObjWithId(PLAYLISTS, selectedPlaylistId)

        UTILS.addSongToPlaylist(selectedSongId, playlistObj)
        PlaylistSelector.hide()
    })
}

const PlaylistSelectorUI = function() {
    if (!PLAYLISTS || !$.isArray(PLAYLISTS) || PLAYLISTS.length === 0) {
        return
    }
    PLAYLISTS.forEach(PlaylistSelector.addPlaylist)
    _bindEvents()
}

export { PlaylistSelector, PlaylistSelectorUI }
