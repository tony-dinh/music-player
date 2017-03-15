import { PlaylistSelector } from '../components/playlist-selector'
import Events from '../global/events'

const TITLE_SORT_KEY = 'title'
const ARTIST_SORT_KEY = 'artist'

let TITLE_SORTED_SONGS = undefined
let ARTIST_SORTED_SONGS = undefined

const _getSongsSortedBy = function(sortKey) {
    const comparator = (a, b) => {
        const exclusionRegEx = new RegExp('^The(\\s)+', 'i')
        const inAscendingOrder = a[sortKey].replace(exclusionRegEx, '') <= b[sortKey].replace(exclusionRegEx, '')
        return inAscendingOrder ? -1 : 1
    }

    switch (sortKey) {
        case TITLE_SORT_KEY:
            if (!TITLE_SORTED_SONGS) {
                const sortedSongs = SONGS.sort(comparator)
                TITLE_SORTED_SONGS = JSON.parse(JSON.stringify(sortedSongs))
            }
            return TITLE_SORTED_SONGS
        default:
            if (!ARTIST_SORTED_SONGS) {
                const sortedSongs = SONGS.sort(comparator)
                ARTIST_SORTED_SONGS = JSON.parse(JSON.stringify(sortedSongs))
            }
            return ARTIST_SORTED_SONGS
    }
}

const _loadSongsSortedBy = function(sortKey) {
    if (!$.isArray(SONGS) || SONGS.length === 0) {
        return
    }
    $('#library').html('')
    const sortedSongs = _getSongsSortedBy(sortKey)

    sortedSongs.forEach((songObj) => {
        library.append(UTILS.songElementFor(songObj)[0])
    })
}

const _bindEvents = function() {
    const activeClass = 'c--active'
    const $body = $('body')

    $body.on('click', '.js-add-to-playlist', function(e) {
        e.stopPropagation()

        const $songEl = $(this).closest('.c-library__item')
        PlaylistSelector.showSelectionFor($songEl.data('id'))
    })

    $('.js-library-sort-button').on('click', function(e) {
        e.stopPropagation()

        // Set button active
        const $selectedBtn = $(this)
        $('.js-library-sort-button').removeClass(activeClass)
        $selectedBtn.addClass(activeClass)

        _loadSongsSortedBy($selectedBtn.data('key'))
    })

    $body.on(Events.names.SONGS_UPDATED, function(e) {
        _loadSongsSortedBy(ARTIST_SORT_KEY)
    })
}

const LibraryUI = function() {
    _bindEvents()
}

export default LibraryUI
