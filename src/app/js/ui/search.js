const SEARCH_BAR_SELECTOR = '#search-bar'
const SEARCH_DOPPLE_SELECTOR = '.c-search-bar__dopple'
const PLAYLIST_RESULTS_SELECTOR = '#search-results .c-search__playlist-results'
const SONG_RESULTS_SELECTOR = '#search-results .c-search__song-results'

const _songsMatching = function(searchKey) {
    const searchKeyExp = new RegExp(searchKey, 'i')
    return SONGS.filter(song => searchKeyExp.test(song.artist) || searchKeyExp.test(song.title))
}

const _playlistsMatching = function(searchKey) {
    const searchKeyExp = new RegExp(searchKey, 'i')
    return PLAYLISTS.filter(playlist => searchKeyExp.test(playlist.name))
}

const _bindEvents = function() {
    const activeClass = 'c--active'
    const $searchBar = $(SEARCH_BAR_SELECTOR)
    const $searchDopple = $(SEARCH_DOPPLE_SELECTOR)
    const $songResults = $(SONG_RESULTS_SELECTOR)
    const $playlistResults = $(PLAYLIST_RESULTS_SELECTOR)

    $searchBar.on('input', function(e) {
        $songResults.html('')
        $playlistResults.html('')
        if ($searchBar.val().length === 0) {
            return
        }
        const matchingSongs = _songsMatching($searchBar.val())
        const matchingPlaylists = _playlistsMatching($searchBar.val())

        matchingSongs.forEach((song) => {
            $songResults.append(UTILS.songElementFor(song)[0])
        })
        matchingPlaylists.forEach((playlist) => {
            $playlistResults.append(UTILS.playlistElementFor(playlist)[0])
        })
    })

    $searchBar.on('blur', function(e) {
        if ($searchBar.val().length === 0) {
            $searchBar.removeClass(activeClass)
            return
        }
        $searchBar.addClass(activeClass)
    })

    $searchDopple.on('click', function(e) {
        e.stopPropagation()
        $searchBar.focus()
    })
}

const SearchUI = function() {
    _bindEvents()
}

export default SearchUI
