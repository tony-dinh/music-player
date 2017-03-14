// Global
import Common from './global/common'
// Components
import { NavBarUI } from './components/nav-bar'
// UI
import LibraryUI from './ui/library'
import PlaylistsUI from './ui/playlists'
import SearchUI from './ui/search'
import LoginUI from  './ui/login'

const App = async function() {
    // Load common dependencies
    await Common.load()
    LoginUI()
    NavBarUI()
    LibraryUI()
    PlaylistsUI()
    SearchUI()
}

App()
