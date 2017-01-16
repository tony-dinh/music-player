var PLAYLISTS = window.MUSIC_DATA ? window.MUSIC_DATA.playlists : undefined;
var TAB_IDS = ['library', 'playlists', 'search'];

// Spacer used for alignment on desktop grid layout
var _addSpacerTo = function(elementId) {
    var el = document.getElementById(elementId);
    var spacer = document.createElement('div');
    spacer.className = 'c-table-grid__item-spacer';
    el.append(spacer);
};

// Library UI
// ---
var _libraryUI = function() {

};

// Playlist UI
// ---
var _addPlaylist = function(playListName) {
    var playlists = document.getElementById('playlists');
    var playlistEl = document.createElement('div');

    playlistEl.className = 'c-table-grid__item c-playlist__item';
    playlistEl.innerHTML = '<div class="c-playlist__item-content c-table-grid__item-content"><img class="c-playlist__item-art" src="../app/styles/assets/150.png" alt="Playlist Art"><div class="c-playlist__item-text"><h4>' + playListName + '</h4></div><div class="c-playlist__item-disclosure"><span class="glyphicon glyphicon-chevron-right"></span></div></div>';
    playlists.append(playlistEl);
};

var _loadPlaylists = function() {
    if (!Array.isArray(PLAYLISTS) || PLAYLISTS.length == 0) {
        return;
    }
    PLAYLISTS.forEach(function(playlist) {
        _addPlaylist(playlist.name);
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

var _registerTabEvents = function() {
    var activeClass = 'c--active';
    var tabs = document.getElementsByClassName('c-nav-bar__tab');
    var tabViews = document.getElementsByClassName('t-tab');

    var removeActiveClassFrom = function(nodeList) {
        var activeClass = 'c--active';
        for (var i = 0; i < nodeList.length; i++) {
            var node = nodeList[i];
            var newClassName = node.className.replace(RegExp('\\b' + activeClass + '\\b'), '');
            node.className = newClassName;
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
        setActiveTab(this);
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
    console.log(window.MUSIC_DATA);
    _libraryUI();
    _playlistUI();
    _searchUI();

    _registerEventHandlers();
};

appUI();
