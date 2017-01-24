import $ from 'jquery'
import Utils from './utils'

const Common = {}

Common.load = function() {
    window.$ = $
    window.UTILS = Utils
    window.SONGS = MUSIC_DATA.songs
    window.PLAYLISTS = MUSIC_DATA.playlists
}

export default Common
