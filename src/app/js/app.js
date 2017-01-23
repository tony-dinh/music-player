// Global
import $ from 'jquery'

// Components
import NavBar from './components/nav-bar'

// UI
import LibraryUI from './ui/library'
import PlaylistUI from './ui/playlists'
import SearchUI from './ui/search'

const App = function() {
    // Export for other scripts
    window.$ = $
    window.SONGS = MUSIC_DATA.songs
    window.PLAYLISTS = MUSIC_DATA.playlists

    // Load all UI modules
    LibraryUI()
    PlaylistUI()
    SearchUI()

    // Bind events
    NavBar.bindEvents()
}

App()
