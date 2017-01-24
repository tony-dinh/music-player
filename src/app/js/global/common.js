import $ from 'jquery'
import Utils from './utils'

const _loadCommponDep = function() {
    window.$ = $
    window.UTILS = Utils
    window.SONGS = MUSIC_DATA.songs
    window.PLAYLISTS = MUSIC_DATA.playlists
}

_loadCommponDep()
