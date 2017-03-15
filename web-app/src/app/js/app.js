import cookieParser from 'cookie-parser'
// Global
import Events from './global/events'
import Request from './global/request'
import Utils from './global/utils'

// Components
import { NavBarUI } from './components/nav-bar'
import { PlaylistSelectorUI } from './components/playlist-selector'

// UI
import LibraryUI from './ui/library'
import PlaylistsUI from './ui/playlists'
import SearchUI from './ui/search'
import LoginUI from  './ui/login'

const _initialState = function() {
    const isLoginPage = /^\/login$/.test(location.pathname)
    const hiddenClass = 'u-hidden'
    const $loginPage = $('#login-page')
    const $playlistApp = $('#playlist-app')

    if (isLoginPage) {
        $loginPage.removeClass(hiddenClass)
        $playlistApp.addClass(hiddenClass)
    } else {
        $playlistApp.removeClass(hiddenClass)
        $loginPage.addClass(hiddenClass)
    }
}

const _bindEvents = function() {
    const $body = $('body')
    $body.on(Events.names.PLAYLISTS_UPDATE_NEEDED, () => {
        Request.getMusicData('playlists').then(function(playlists) {
            window.PLAYLISTS = playlists
            $body.trigger(Events.names.PLAYLISTS_UPDATED)
        })
    })
}

const loadMusic = function() {
    return Promise.all([
        Request.getMusicData('playlists'),
        Request.getMusicData('songs')
    ]).then(function(musicData) {
        const $body = $('body')
        window.PLAYLISTS = musicData[0]
        window.SONGS = musicData[1]
        $body.trigger(Events.names.SONGS_UPDATED)
        $body.trigger(Events.names.PLAYLISTS_UPDATED)
    })
}

const App =  function() {
    window.UTILS = Utils
    _bindEvents()

    // Load common dependencies
    NavBarUI()
    LoginUI()
    LibraryUI()
    PlaylistsUI()
    SearchUI()
    PlaylistSelectorUI()
    _initialState()

    loadMusic().then(() => $('body').trigger(Events.names.MUSIC_LOADED))
}

App()
