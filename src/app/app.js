var TITLE_SORT_KEY = 'title';
var ARTIST_SORT_KEY = 'artist';

var TITLE_SORTED_SONGS = undefined;
var ARTIST_SORTED_SONGS = undefined;

var SONGS = window.MUSIC_DATA ? window.MUSIC_DATA.songs : undefined;
var PLAYLISTS = window.MUSIC_DATA ? window.MUSIC_DATA.playlists : undefined;

// Spacer used for alignment on desktop grid layout
var _addSpacerTo = function(elementId) {
    var el = document.getElementById(elementId);
    var spacer = document.createElement('div');
    spacer.className = 'c-table-grid__item-spacer';
    el.append(spacer);
};

var getPlaylistWithId = function(playlistId) {
    if (!PLAYLISTS) {
        return undefined;
    }

    var playlists = PLAYLISTS.filter(function(playlist) {
       return playlist.id === playlistId
    });

    return playlists.length > 0 ? playlists[0] : undefined;
};

// Library UI
// ---
var _getSongsSortedBy = function(sortKey) {
    var sortSongsBy = function(sortKey) {
        return SONGS.sort(function(songA, songB) {
            var inAscendingOrder = songA[sortKey].replace(/^The(\s)+/i, '') <= songB[sortKey].replace(/^The(\s)+/i, '');
            return inAscendingOrder ? -1 : 1;
        });
    };
    switch (sortKey) {
        case TITLE_SORT_KEY:
            if (!TITLE_SORTED_SONGS) {
                TITLE_SORTED_SONGS = JSON.parse(JSON.stringify(sortSongsBy(TITLE_SORT_KEY)));
            }
            return TITLE_SORTED_SONGS;
        default:
            if (!ARTIST_SORTED_SONGS) {
                ARTIST_SORTED_SONGS = JSON.parse(JSON.stringify(sortSongsBy(ARTIST_SORT_KEY)));
            }
            return ARTIST_SORTED_SONGS;
    }
};

var _loadSongsSortedBy = function(sortKey) {
    if (!Array.isArray(SONGS) || SONGS.length == 0) {
        return;
    }

    var sortedSongs = _getSongsSortedBy(sortKey);
    var library = document.getElementById('library');
    var addSong = function(songObj) {
        var songEl = document.createElement('div');

        songEl.className = 'c-table-grid__item c-library__item';
        songEl.dataset.id = songObj.id;
        songEl.innerHTML = '<div class="c-library__item-content c-table-grid__item-content"><img class="c-library__item-art" src="../app/styles/assets/150.png" alt="Album Art"><div class="c-library__item-text u-flex-col u--middle"><h4>' + songObj.title + '</h4><h5>' + songObj.artist + '</h5></div><div class="c-library__item-disclosure"><button type="button" name="Play" class="js-play c-button c--disclosure glyphicon glyphicon-play"></button><button type="button" name="Add To Playlist" class="js-add-to-playlist c-button c--disclosure glyphicon glyphicon-plus-sign"></button></div></div>';
        library.append(songEl);
    }

    // Clear all existing songs
    library.innerHTML = '';
    sortedSongs.forEach(addSong);
    _addSpacerTo('library');

    // TODO: remove when jQuery is allowed
    _registerAddToPlaylistEvents();
};

var _registerSortEvents = function() {
    var activeClass = 'c--active';
    var sortButtons = document.getElementsByClassName('js-library-sort-button');

    var setActive = function(el) {
        var prevActiveButton = document.getElementsByClassName('js-library-sort-button c--active')[0];
        prevActiveButton.className = prevActiveButton.className.replace(RegExp('\\b' + activeClass + '\\b'), '');
        el.className = el.className + ' ' + activeClass;
    };

    var sortEventHandler = function(e) {
        e.stopPropagation();
        _loadSongsSortedBy(this.dataset.key);
        setActive(this);
    };

    for (var i = 0; i < sortButtons.length ; i++) {
        var button = sortButtons[i];
        button.addEventListener('click', sortEventHandler, false);
    }
};

var _registerAddToPlaylistEvents = function() {
    var buttons = document.getElementsByClassName('js-add-to-playlist');

    var showPlaylistSelectionFor = function(songId) {
        var overlay = document.getElementsByClassName('c-overlay')[0];
        overlay.className = overlay.className + ' c--visible';
        overlay.dataset.songId = songId;

        // TODO: use jQuery to make this more robust
        document.getElementsByTagName('body')[0].className = 'u-no-scroll';
    };

    var addToPlaylistHandler = function(e) {
        e.stopPropagation();
        var songEl = this.closest('.c-library__item');
        showPlaylistSelectionFor(parseInt(songEl.dataset.id));
    };

    for (var i = 0; i < buttons.length ; i++) {
        var button = buttons[i];
        button.addEventListener('click', addToPlaylistHandler, false);
    }
};

var _hideOverlay = function() {
    var overlay = document.getElementsByClassName('c-overlay')[0];
    overlay.className = overlay.className.replace('c--visible', '');

    // TODO: use jQuery to make this more robust
    document.getElementsByTagName('body')[0].className = '';
};

var _loadListSelector = function() {
    var listSelector = document.getElementById('playlist-list-selector');
    var addToListSelector = function(playlist) {
        var playlistEl = document.createElement('li');
        playlistEl.className = 'c-list-selector__item';
        playlistEl.textContent = playlist.name;
        playlistEl.dataset.id = playlist.id;
        listSelector.append(playlistEl);

        playlistEl.addEventListener('click', function(e) {
            e.stopPropagation();
            var selectedPlaylist = getPlaylistWithId(parseInt(this.dataset.id));
            var selectedSongId = parseInt(document.getElementsByClassName('c-overlay')[0].dataset.songId);
            if (!!selectedPlaylist && !selectedPlaylist.songs.includes(selectedSongId)) {
                console.log('playListBefore: ', selectedPlaylist.songs);
                selectedPlaylist.songs.push(selectedSongId);
                console.log('playListAfter adding ' + selectedSongId + ': ', selectedPlaylist.songs);
            }
            _hideOverlay();
        });
    };

    _registerPlaylistSelectorEvents();
    PLAYLISTS.forEach(addToListSelector);
};

var _registerPlaylistSelectorEvents = function() {
    var overlay = document.getElementsByClassName('c-overlay')[0];
    var closeButton = document.getElementsByClassName('c-list-selector__close-button')[0];
    var closeListSelectorHandler = function(e) {
        e.stopPropagation();
        // Ignore if the event source is not the listener
        if (this === e.target) {
            _hideOverlay();
        }
    };

    overlay.addEventListener('click', closeListSelectorHandler);
    closeButton.addEventListener('click', closeListSelectorHandler);
};

var _registerLibraryEvents = function() {
    _registerSortEvents();
};

var _libraryUI = function() {
    _loadSongsSortedBy(ARTIST_SORT_KEY);
    _loadListSelector();
    _registerLibraryEvents();
};

// Playlist UI
// ---
var _loadPlaylists = function() {
    if (!Array.isArray(PLAYLISTS) || PLAYLISTS.length == 0) {
        return;
    }

    var addPlaylist = function(playlistObj) {
        var playlists = document.getElementById('playlists');
        var playlistEl = document.createElement('div');

        playlistEl.className = 'c-table-grid__item c-playlist__item';
        playlistEl.dataset.id = playlistObj.id;
        playlistEl.innerHTML = '<div class="c-playlist__item-content c-table-grid__item-content"><img class="c-playlist__item-art" src="../app/styles/assets/150.png" alt="Playlist Art"><div class="c-playlist__item-text u-flex-col u--middle"><h4>' + playlistObj.name + '</h4></div><div class="c-playlist__item-disclosure"><span class="glyphicon glyphicon-chevron-right"></span></div></div>';
        playlists.append(playlistEl);
    };

    PLAYLISTS.forEach(addPlaylist);
    _addSpacerTo('playlists');
};

var _playlistUI = function() {
    _loadPlaylists();
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
    };

    for (var i = 0; i < tabs.length ; i++) {
        var tab = tabs[i];
        tab.addEventListener('click', tabClickHandler, false);
    }
};

var appUI = function() {
    _libraryUI();
    _playlistUI();
    _searchUI();

    _registerTabEvents();
};

appUI();
