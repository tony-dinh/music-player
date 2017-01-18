var PLAYLISTS = window.MUSIC_DATA ? window.MUSIC_DATA.playlists : undefined;
var SONGS = window.MUSIC_DATA ? window.MUSIC_DATA.songs : undefined;

// Spacer used for alignment on desktop grid layout
var _addSpacerTo = function(elementId) {
    var el = document.getElementById(elementId);
    var spacer = document.createElement('div');
    spacer.className = 'c-table-grid__item-spacer';
    el.append(spacer);
};

// Library UI
// ---
var _loadSongs = function() {
    if (!Array.isArray(SONGS) || SONGS.length == 0) {
        return;
    }

    var addSong = function(songObj) {
        var library = document.getElementById('library');
        var songEl = document.createElement('div');

        songEl.className = 'c-table-grid__item c-library__item'
        songEl.innerHTML = '<div class="c-library__item-content c-table-grid__item-content"><img class="c-library__item-art" src="../app/styles/assets/150.png" alt="Album Art"><div class="c-library__item-text u-flex-col u--center"><h4>' + songObj.title + '</h4><h5>' + songObj.album + '</h5></div><div class="c-library__item-disclosure"><button type="button" name="Play" class="c-button c--disclosure glyphicon glyphicon-play"></button><button type="button" name="Add To Playlist" class="c-button c--disclosure glyphicon glyphicon-plus-sign"></button></div></div>'
        library.append(songEl);
    }

    SONGS.forEach(function(song) {
        addSong(song);
    });
};

var _libraryUI = function() {
    _loadSongs();
    _addSpacerTo('library');
};

// Playlist UI
// ---
var _loadPlaylists = function() {
    if (!Array.isArray(PLAYLISTS) || PLAYLISTS.length == 0) {
        return;
    }

    var addPlaylist = function(playListName) {
        var playlists = document.getElementById('playlists');
        var playlistEl = document.createElement('div');

        playlistEl.className = 'c-table-grid__item c-playlist__item';
        playlistEl.innerHTML = '<div class="c-playlist__item-content c-table-grid__item-content"><img class="c-playlist__item-art" src="../app/styles/assets/150.png" alt="Playlist Art"><div class="c-playlist__item-text u-flex-col u--center"><h4>' + playListName + '</h4></div><div class="c-playlist__item-disclosure"><span class="glyphicon glyphicon-chevron-right"></span></div></div>';
        playlists.append(playlistEl);
    };

    PLAYLISTS.forEach(function(playlist) {
        addPlaylist(playlist.name);
    });
};

var _playlistUI = function() {
    _loadPlaylists();
    _addSpacerTo('playlists');
};

// Search UI
// ---
var _searchUI = function() {

};

// Event Handling
// ---
var _registerTabEvents = function() {
    var activeClass = 'c--active';
    var tabs = document.getElementsByClassName('c-nav-bar__tab');
    var tabViews = document.getElementsByClassName('t-tab');

    var removeActiveClassFrom = function(eList) {
        var activeClass = 'c--active';
        for (var i = 0; i < eList.length; i++) {
            var el = eList[i];
            el.className = el.className.replace(RegExp('\\b' + activeClass + '\\b'), '');;
        }
    };

    var setActiveTab = function(activeTabEl) {
        removeActiveClassFrom(tabs);
        removeActiveClassFrom(tabViews);

        activeTabEl.className = activeTabEl.className + ' ' + activeClass;
        var activeTabView = document.getElementById(activeTabEl.dataset.tab + '-tab-content');
        activeTabView.className = activeTabView.className + ' ' + activeClass;
    };

    var tabClickHandler = function(e) {
        e.stopPropagation();
        if (this.classList.contains(activeClass)) {
            return;
        }
        setActiveTab(this);
        // window.scrollTo(0, 0);
    };

    for (var i = 0; i < tabs.length ; i++) {
        var tab = tabs[i];
        tab.addEventListener('click', tabClickHandler, false);
    }
};

var _registerEventHandlers = function() {
    _registerTabEvents();
};

var appUI = function() {
    _libraryUI();
    _playlistUI();
    _searchUI();

    _registerEventHandlers();
};

appUI();
