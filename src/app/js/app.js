// Global
import Common from './global/common'
// Components
import { NavBarUI } from './components/nav-bar'
// UI
import LibraryUI from './ui/library'
import PlaylistUI from './ui/playlists'
import SearchUI from './ui/search'

const App = function() {
    Common.load()

    NavBarUI()
    LibraryUI()
    PlaylistUI()
    SearchUI()
}

App()
