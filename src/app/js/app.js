// Global
import './global/common'

// Components
import NavBar from './components/nav-bar'

// UI
import LibraryUI from './ui/library'
import PlaylistUI from './ui/playlists'
import SearchUI from './ui/search'

const App = function() {
    LibraryUI()
    PlaylistUI()
    SearchUI()

    NavBar.bindEvents()
}

App()
