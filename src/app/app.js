var TITLE_SORT_KEY = 'title';
var ARTIST_SORT_KEY = 'artist';

var TITLE_SORTED_SONGS = undefined;
var ARTIST_SORTED_SONGS = undefined;

var SONGS = window.MUSIC_DATA ? window.MUSIC_DATA.songs : undefined;
var PLAYLISTS = window.MUSIC_DATA ? window.MUSIC_DATA.playlists : undefined;

var getPlaylistWithId = function(playlistId) {
    if (!PLAYLISTS) {
        return undefined;
    }
    var playlistId = parseInt(playlistId);
    var playlists = PLAYLISTS.filter(function(playlist) {
       return playlist.id === playlistId;
    });

    return playlists.length > 0 ? playlists[0] : undefined;
};

var getSongWithId = function(songId) {
    if (!SONGS) {
        return undefined;
    }
    var songId = parseInt(songId);
    var songs = SONGS.filter(function(song) {
        return song.id === songId;
    });

    return songs.length > 0 ? songs[0] : undefined;
};

var _songElementFor = function(songObj) {
    var el = document.createElement('div');
    el.className = 'c-table-grid__item c-library__item';
    el.dataset.id = songObj.id;
    el.innerHTML = '<div class="c-library__item-content c-table-grid__item-content"><img class="c-library__item-art" src="../app/styles/assets/song-art-200.jpg" alt="Album Art"><div class="c-library__item-text u-flex-col u--middle"><h4>' + songObj.title + '</h4><h5>' + songObj.artist + '</h5></div><div class="c-library__item-disclosure"><button type="button" name="Play" class="js-play c-button c--disclosure glyphicon glyphicon-play"></button><button type="button" name="Add To Playlist" class="js-add-to-playlist c-button c--disclosure glyphicon glyphicon-plus-sign"></button></div></div>';

    return el;
};

var _playlistElementFor = function(playlistObj) {
    var el = document.createElement('div');
    el.className = 'c-table-grid__item c-playlist__item';
    el.dataset.id = playlistObj.id;
    el.innerHTML = '<div class="c-playlist__item-content c-table-grid__item-content"><img class="c-playlist__item-art" src="../app/styles/assets/playlist-art-200.jpg" alt="Playlist Art"><div class="c-playlist__item-text u-flex-col u--middle"><h4>' + playlistObj.name + '</h4></div><div class="c-playlist__item-disclosure"><span class="glyphicon glyphicon-chevron-right"></span></div></div>';

    return el;
}

var _removeActiveClassFrom = function(eList) {
    var activeClass = 'c--active';
    for (var i = 0; i < eList.length; i++) {
        var el = eList[i];
        el.className = el.className.replace(RegExp('\\b' + activeClass + '\\b'), '');;
    }
};

var _setTabViewActive = function(tabViewEl) {
    var activeClass = 'c--active';
    var tabViews = document.getElementsByClassName('t-tab');
    _removeActiveClassFrom(tabViews);

    tabViewEl.className = tabViewEl.className + ' ' + activeClass;
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

    // Clear all existing songs
    library.innerHTML = '';
    sortedSongs.forEach(function(songObj) {
        library.append(_songElementFor(songObj));
    });

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

var _showPlaylistSelectionFor = function(songId) {
    var overlay = document.getElementsByClassName('c-overlay')[0];
    overlay.className = overlay.className + ' c--visible';
    overlay.dataset.songId = songId;

    // TODO: use jQuery to make this more robust
    document.getElementsByTagName('body')[0].className = 'u-no-scroll';
};

var _hidePlaylistListSelector = function() {
    var overlay = document.getElementsByClassName('c-overlay')[0];
    overlay.className = overlay.className.replace('c--visible', '');

    // TODO: use jQuery to make this more robust
    document.getElementsByTagName('body')[0].className = '';
};

var _addToPlaylistHandler = function(e) {
    e.stopPropagation();
    var songEl = this.closest('.c-library__item');
    _showPlaylistSelectionFor(parseInt(songEl.dataset.id));
};

var _registerAddToPlaylistEvents = function() {
    var buttons = document.getElementsByClassName('js-add-to-playlist');


    for (var i = 0; i < buttons.length ; i++) {
        var button = buttons[i];
        button.addEventListener('click', _addToPlaylistHandler, false);
    }
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
            var selectedPlaylist = getPlaylistWithId(this.dataset.id);
            var selectedSongId = parseInt(document.getElementsByClassName('c-overlay')[0].dataset.songId);
            if (!!selectedPlaylist && !selectedPlaylist.songs.includes(selectedSongId)) {
                selectedPlaylist.songs.push(selectedSongId);
            }
            _hidePlaylistListSelector();
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
            _hidePlaylistListSelector();
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

var _playlistClickHandler = function(e) {
    e.stopPropagation();
    var playlistDetailsTabView = document.getElementById('playlist-details');
    playlistDetailsTabView.dataset.playlistId = this.dataset.id;

    var playlistHeader = document.querySelector('.c-playlist-details__heading-container h1');
    var playlistSongList = document.querySelector('#playlist-song-list');
    var playlistObj = getPlaylistWithId(this.dataset.id);

    playlistHeader.textContent = playlistObj.name;
    playlistSongList.innerHTML = '';
    playlistObj.songs.forEach(function(songId) {
        var songEl = _songElementFor(getSongWithId(songId));
        var addButton = songEl.querySelector('.js-add-to-playlist');
        addButton.addEventListener('click', _addToPlaylistHandler);
        playlistSongList.append(songEl);
    });
    _setTabViewActive(playlistDetailsTabView);
};

var _loadPlaylists = function() {
    if (!Array.isArray(PLAYLISTS) || PLAYLISTS.length == 0) {
        return;
    }

    var playlists = document.getElementById('playlists');
    playlists.innerHTML = '';

    PLAYLISTS.forEach(function(playlistObj) {
        var playlistEl = _playlistElementFor(playlistObj);
        playlistEl.addEventListener('click', _playlistClickHandler);

        playlists.append(playlistEl);
    });
};

var _playlistUI = function() {
    _loadPlaylists();
};

// Search UI
// ---
var _playlistsMatching = function(searchKey) {
    var searchKeyExp = new RegExp(searchKey, 'i');
    return PLAYLISTS.filter(function(playlist) {
        return searchKeyExp.test(playlist.name);
    });
};

var _songsMatching = function(searchKey) {
    var searchKeyExp = new RegExp(searchKey, 'i');
    return SONGS.filter(function(song) {
        return searchKeyExp.test(song.artist) || searchKeyExp.test(song.title);
    });
};

var _registerSearchEvents = function() {
    var searchBar = document.getElementById('search-bar');
    var dopple = document.getElementsByClassName('c-search-bar__dopple')[0];
    var playlistResults = document.querySelector('#search-results .c-search__playlist-results');
    var songResults = document.querySelector('#search-results .c-search__song-results');

    searchBar.addEventListener('input', function(e) {
        playlistResults.innerHTML = '';
        songResults.innerHTML = '';

        if (searchBar.value.length === 0) {
            return;
        }
        var matchingPlaylists = _playlistsMatching(searchBar.value);
        var matchingSongs = _songsMatching(searchBar.value);

        matchingPlaylists.forEach(function(playlistObj) {
            var playlistEl = _playlistElementFor(playlistObj);
            playlistEl.addEventListener('click', _playlistClickHandler);
            playlistResults.append(playlistEl);
        });

        matchingSongs.forEach(function(songObj) {
            var songEl = _songElementFor(songObj);
            var addButton = songEl.querySelector('.js-add-to-playlist');
            addButton.addEventListener('click', _addToPlaylistHandler);
            songResults.append(songEl);
        });
    });

    searchBar.addEventListener('blur', function() {
        var activeClass = 'c--active';
        if (searchBar.value.length === 0) {
            searchBar.className = searchBar.className.replace(activeClass, '');
            return;
        }

        if (searchBar.classList.contains(activeClass)) {
            return;
        }

        searchBar.className = searchBar.className + ' ' + activeClass;
    });

    dopple.addEventListener('click', function(e) {
        searchBar.focus();
        e.stopPropagation();
    });
};

var _searchUI = function() {
    _registerSearchEvents();
};

// Event Handling
// ---
var _registerTabEvents = function() {
    var activeClass = 'c--active';
    var tabs = document.getElementsByClassName('c-nav-bar__tab');

    var setActiveTab = function(activeTabEl) {
        _removeActiveClassFrom(tabs);
        activeTabEl.className = activeTabEl.className + ' ' + activeClass;
        var tabViewEl = document.getElementById(activeTabEl.dataset.tab + '-tab-content');
        _setTabViewActive(tabViewEl);
    };

    var tabClickHandler = function(e) {
        e.stopPropagation();
        _hidePlaylistListSelector();
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
