import cookieParser from 'cookie-parser'
// Global
import Common from './global/common'
import Events from './global/events'
// Components
import { NavBarUI } from './components/nav-bar'
// UI
import LibraryUI from './ui/library'
import PlaylistsUI from './ui/playlists'
import SearchUI from './ui/search'
import LoginUI from  './ui/login'

const _initialState = async function() {
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

const App = async function() {
    // Load common dependencies
    await Common.load()
    LoginUI()
    NavBarUI()
    LibraryUI()
    PlaylistsUI()
    SearchUI()

    _initialState()
}

App()
