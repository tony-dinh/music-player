/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _stringify = __webpack_require__(1);
	
	var _stringify2 = _interopRequireDefault(_stringify);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TITLE_SORT_KEY = 'title';
	var ARTIST_SORT_KEY = 'artist';
	
	var TITLE_SORTED_SONGS = undefined;
	var ARTIST_SORTED_SONGS = undefined;
	
	var SONGS = window.MUSIC_DATA ? window.MUSIC_DATA.songs : undefined;
	var PLAYLISTS = window.MUSIC_DATA ? window.MUSIC_DATA.playlists : undefined;
	
	var getPlaylistWithId = function getPlaylistWithId(playlistId) {
	    if (!PLAYLISTS) {
	        return undefined;
	    }
	    var playlistId = parseInt(playlistId);
	    var playlists = PLAYLISTS.filter(function (playlist) {
	        return playlist.id === playlistId;
	    });
	
	    return playlists.length > 0 ? playlists[0] : undefined;
	};
	
	var getSongWithId = function getSongWithId(songId) {
	    if (!SONGS) {
	        return undefined;
	    }
	    var songId = parseInt(songId);
	    var songs = SONGS.filter(function (song) {
	        return song.id === songId;
	    });
	
	    return songs.length > 0 ? songs[0] : undefined;
	};
	
	var _songElementFor = function _songElementFor(songObj) {
	    var el = document.createElement('div');
	    el.className = 'c-table-grid__item c-library__item';
	    el.dataset.id = songObj.id;
	    el.innerHTML = '<div class="c-library__item-content c-table-grid__item-content"><img class="c-library__item-art" src="../app/styles/assets/song-art-200.jpg" alt="Album Art"><div class="c-library__item-text u-flex-col u--middle"><h4>' + songObj.title + '</h4><h5>' + songObj.artist + '</h5></div><div class="c-library__item-disclosure"><button type="button" name="Play" class="js-play c-button c--disclosure glyphicon glyphicon-play"></button><button type="button" name="Add To Playlist" class="js-add-to-playlist c-button c--disclosure glyphicon glyphicon-plus-sign"></button></div></div>';
	
	    return el;
	};
	
	var _playlistElementFor = function _playlistElementFor(playlistObj) {
	    var el = document.createElement('div');
	    el.className = 'c-table-grid__item c-playlist__item';
	    el.dataset.id = playlistObj.id;
	    el.innerHTML = '<div class="c-playlist__item-content c-table-grid__item-content"><img class="c-playlist__item-art" src="../app/styles/assets/playlist-art-200.jpg" alt="Playlist Art"><div class="c-playlist__item-text u-flex-col u--middle"><h4>' + playlistObj.name + '</h4></div><div class="c-playlist__item-disclosure"><span class="glyphicon glyphicon-chevron-right"></span></div></div>';
	
	    return el;
	};
	
	var _removeActiveClassFrom = function _removeActiveClassFrom(eList) {
	    var activeClass = 'c--active';
	    for (var i = 0; i < eList.length; i++) {
	        var el = eList[i];
	        el.className = el.className.replace(RegExp('\\b' + activeClass + '\\b'), '');;
	    }
	};
	
	var _setTabViewActive = function _setTabViewActive(tabViewEl) {
	    var activeClass = 'c--active';
	    var tabViews = document.getElementsByClassName('t-tab');
	    _removeActiveClassFrom(tabViews);
	
	    tabViewEl.className = tabViewEl.className + ' ' + activeClass;
	};
	
	// Library UI
	// ---
	var _getSongsSortedBy = function _getSongsSortedBy(sortKey) {
	    var sortSongsBy = function sortSongsBy(sortKey) {
	        return SONGS.sort(function (songA, songB) {
	            var inAscendingOrder = songA[sortKey].replace(/^The(\s)+/i, '') <= songB[sortKey].replace(/^The(\s)+/i, '');
	            return inAscendingOrder ? -1 : 1;
	        });
	    };
	    switch (sortKey) {
	        case TITLE_SORT_KEY:
	            if (!TITLE_SORTED_SONGS) {
	                TITLE_SORTED_SONGS = JSON.parse((0, _stringify2.default)(sortSongsBy(TITLE_SORT_KEY)));
	            }
	            return TITLE_SORTED_SONGS;
	        default:
	            if (!ARTIST_SORTED_SONGS) {
	                ARTIST_SORTED_SONGS = JSON.parse((0, _stringify2.default)(sortSongsBy(ARTIST_SORT_KEY)));
	            }
	            return ARTIST_SORTED_SONGS;
	    }
	};
	
	var _loadSongsSortedBy = function _loadSongsSortedBy(sortKey) {
	    if (!Array.isArray(SONGS) || SONGS.length == 0) {
	        return;
	    }
	
	    var sortedSongs = _getSongsSortedBy(sortKey);
	    var library = document.getElementById('library');
	
	    // Clear all existing songs
	    library.innerHTML = '';
	    sortedSongs.forEach(function (songObj) {
	        library.append(_songElementFor(songObj));
	    });
	
	    // TODO: remove when jQuery is allowed
	    _registerAddToPlaylistEvents();
	};
	
	var _registerSortEvents = function _registerSortEvents() {
	    var activeClass = 'c--active';
	    var sortButtons = document.getElementsByClassName('js-library-sort-button');
	
	    var setActive = function setActive(el) {
	        var prevActiveButton = document.getElementsByClassName('js-library-sort-button c--active')[0];
	        prevActiveButton.className = prevActiveButton.className.replace(RegExp('\\b' + activeClass + '\\b'), '');
	        el.className = el.className + ' ' + activeClass;
	    };
	
	    var sortEventHandler = function sortEventHandler(e) {
	        e.stopPropagation();
	        _loadSongsSortedBy(this.dataset.key);
	        setActive(this);
	    };
	
	    for (var i = 0; i < sortButtons.length; i++) {
	        var button = sortButtons[i];
	        button.addEventListener('click', sortEventHandler, false);
	    }
	};
	
	var _showPlaylistSelectionFor = function _showPlaylistSelectionFor(songId) {
	    var overlay = document.getElementsByClassName('c-overlay')[0];
	    overlay.className = overlay.className + ' c--visible';
	    overlay.dataset.songId = songId;
	
	    // TODO: use jQuery to make this more robust
	    document.getElementsByTagName('body')[0].className = 'u-no-scroll';
	};
	
	var _hidePlaylistListSelector = function _hidePlaylistListSelector() {
	    var overlay = document.getElementsByClassName('c-overlay')[0];
	    overlay.className = overlay.className.replace('c--visible', '');
	
	    // TODO: use jQuery to make this more robust
	    document.getElementsByTagName('body')[0].className = '';
	};
	
	var _addToPlaylistHandler = function _addToPlaylistHandler(e) {
	    e.stopPropagation();
	    var songEl = this.closest('.c-library__item');
	    _showPlaylistSelectionFor(parseInt(songEl.dataset.id));
	};
	
	var _registerAddToPlaylistEvents = function _registerAddToPlaylistEvents() {
	    var buttons = document.getElementsByClassName('js-add-to-playlist');
	
	    for (var i = 0; i < buttons.length; i++) {
	        var button = buttons[i];
	        button.addEventListener('click', _addToPlaylistHandler, false);
	    }
	};
	
	var _loadListSelector = function _loadListSelector() {
	    var listSelector = document.getElementById('playlist-list-selector');
	    var addToListSelector = function addToListSelector(playlist) {
	        var playlistEl = document.createElement('li');
	        playlistEl.className = 'c-list-selector__item';
	        playlistEl.textContent = playlist.name;
	        playlistEl.dataset.id = playlist.id;
	        listSelector.append(playlistEl);
	
	        playlistEl.addEventListener('click', function (e) {
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
	
	var _registerPlaylistSelectorEvents = function _registerPlaylistSelectorEvents() {
	    var overlay = document.getElementsByClassName('c-overlay')[0];
	    var closeButton = document.getElementsByClassName('c-list-selector__close-button')[0];
	    var closeListSelectorHandler = function closeListSelectorHandler(e) {
	        e.stopPropagation();
	        // Ignore if the event source is not the listener
	        if (this === e.target) {
	            _hidePlaylistListSelector();
	        }
	    };
	
	    overlay.addEventListener('click', closeListSelectorHandler);
	    closeButton.addEventListener('click', closeListSelectorHandler);
	};
	
	var _registerLibraryEvents = function _registerLibraryEvents() {
	    _registerSortEvents();
	};
	
	var _libraryUI = function _libraryUI() {
	    _loadSongsSortedBy(ARTIST_SORT_KEY);
	    _loadListSelector();
	    _registerLibraryEvents();
	};
	
	// Playlist UI
	// ---
	
	var _playlistClickHandler = function _playlistClickHandler(e) {
	    e.stopPropagation();
	    var playlistDetailsTabView = document.getElementById('playlist-details');
	    playlistDetailsTabView.dataset.playlistId = this.dataset.id;
	
	    var playlistHeader = document.querySelector('.c-playlist-details__heading-container h1');
	    var playlistSongList = document.querySelector('#playlist-song-list');
	    var playlistObj = getPlaylistWithId(this.dataset.id);
	
	    playlistHeader.textContent = playlistObj.name;
	    playlistSongList.innerHTML = '';
	    playlistObj.songs.forEach(function (songId) {
	        var songEl = _songElementFor(getSongWithId(songId));
	        var addButton = songEl.querySelector('.js-add-to-playlist');
	        addButton.addEventListener('click', _addToPlaylistHandler);
	        playlistSongList.append(songEl);
	    });
	    _setTabViewActive(playlistDetailsTabView);
	};
	
	var _loadPlaylists = function _loadPlaylists() {
	    if (!Array.isArray(PLAYLISTS) || PLAYLISTS.length == 0) {
	        return;
	    }
	
	    var playlists = document.getElementById('playlists');
	    playlists.innerHTML = '';
	
	    PLAYLISTS.forEach(function (playlistObj) {
	        var playlistEl = _playlistElementFor(playlistObj);
	        playlistEl.addEventListener('click', _playlistClickHandler);
	
	        playlists.append(playlistEl);
	    });
	};
	
	var _playlistUI = function _playlistUI() {
	    _loadPlaylists();
	};
	
	// Search UI
	// ---
	var _playlistsMatching = function _playlistsMatching(searchKey) {
	    var searchKeyExp = new RegExp(searchKey, 'i');
	    return PLAYLISTS.filter(function (playlist) {
	        return searchKeyExp.test(playlist.name);
	    });
	};
	
	var _songsMatching = function _songsMatching(searchKey) {
	    var searchKeyExp = new RegExp(searchKey, 'i');
	    return SONGS.filter(function (song) {
	        return searchKeyExp.test(song.artist) || searchKeyExp.test(song.title);
	    });
	};
	
	var _registerSearchEvents = function _registerSearchEvents() {
	    var searchBar = document.getElementById('search-bar');
	    var dopple = document.getElementsByClassName('c-search-bar__dopple')[0];
	    var playlistResults = document.querySelector('#search-results .c-search__playlist-results');
	    var songResults = document.querySelector('#search-results .c-search__song-results');
	
	    searchBar.addEventListener('input', function (e) {
	        playlistResults.innerHTML = '';
	        songResults.innerHTML = '';
	
	        if (searchBar.value.length === 0) {
	            return;
	        }
	        var matchingPlaylists = _playlistsMatching(searchBar.value);
	        var matchingSongs = _songsMatching(searchBar.value);
	
	        matchingPlaylists.forEach(function (playlistObj) {
	            var playlistEl = _playlistElementFor(playlistObj);
	            playlistEl.addEventListener('click', _playlistClickHandler);
	            playlistResults.append(playlistEl);
	        });
	
	        matchingSongs.forEach(function (songObj) {
	            var songEl = _songElementFor(songObj);
	            var addButton = songEl.querySelector('.js-add-to-playlist');
	            addButton.addEventListener('click', _addToPlaylistHandler);
	            songResults.append(songEl);
	        });
	    });
	
	    searchBar.addEventListener('blur', function () {
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
	
	    dopple.addEventListener('click', function (e) {
	        searchBar.focus();
	        e.stopPropagation();
	    });
	};
	
	var _searchUI = function _searchUI() {
	    _registerSearchEvents();
	};
	
	// Event Handling
	// ---
	var _registerTabEvents = function _registerTabEvents() {
	    var activeClass = 'c--active';
	    var tabs = document.getElementsByClassName('c-nav-bar__tab');
	
	    var setActiveTab = function setActiveTab(activeTabEl) {
	        _removeActiveClassFrom(tabs);
	        activeTabEl.className = activeTabEl.className + ' ' + activeClass;
	        var tabViewEl = document.getElementById(activeTabEl.dataset.tab + '-tab-content');
	        _setTabViewActive(tabViewEl);
	    };
	
	    var tabClickHandler = function tabClickHandler(e) {
	        e.stopPropagation();
	        _hidePlaylistListSelector();
	        setActiveTab(this);
	    };
	
	    for (var i = 0; i < tabs.length; i++) {
	        var tab = tabs[i];
	        tab.addEventListener('click', tabClickHandler, false);
	    }
	};
	
	var appUI = function appUI() {
	    _libraryUI();
	    _playlistUI();
	    _searchUI();
	
	    _registerTabEvents();
	};
	
	appUI();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var core  = __webpack_require__(3)
	  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
	module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
	  return $JSON.stringify.apply($JSON, arguments);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjEwM2ZlZGIyMTliNDhhMzg5OTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvanNvbi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyJdLCJuYW1lcyI6WyJUSVRMRV9TT1JUX0tFWSIsIkFSVElTVF9TT1JUX0tFWSIsIlRJVExFX1NPUlRFRF9TT05HUyIsInVuZGVmaW5lZCIsIkFSVElTVF9TT1JURURfU09OR1MiLCJTT05HUyIsIndpbmRvdyIsIk1VU0lDX0RBVEEiLCJzb25ncyIsIlBMQVlMSVNUUyIsInBsYXlsaXN0cyIsImdldFBsYXlsaXN0V2l0aElkIiwicGxheWxpc3RJZCIsInBhcnNlSW50IiwiZmlsdGVyIiwicGxheWxpc3QiLCJpZCIsImxlbmd0aCIsImdldFNvbmdXaXRoSWQiLCJzb25nSWQiLCJzb25nIiwiX3NvbmdFbGVtZW50Rm9yIiwic29uZ09iaiIsImVsIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZGF0YXNldCIsImlubmVySFRNTCIsInRpdGxlIiwiYXJ0aXN0IiwiX3BsYXlsaXN0RWxlbWVudEZvciIsInBsYXlsaXN0T2JqIiwibmFtZSIsIl9yZW1vdmVBY3RpdmVDbGFzc0Zyb20iLCJlTGlzdCIsImFjdGl2ZUNsYXNzIiwiaSIsInJlcGxhY2UiLCJSZWdFeHAiLCJfc2V0VGFiVmlld0FjdGl2ZSIsInRhYlZpZXdFbCIsInRhYlZpZXdzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIl9nZXRTb25nc1NvcnRlZEJ5Iiwic29ydEtleSIsInNvcnRTb25nc0J5Iiwic29ydCIsInNvbmdBIiwic29uZ0IiLCJpbkFzY2VuZGluZ09yZGVyIiwiSlNPTiIsInBhcnNlIiwiX2xvYWRTb25nc1NvcnRlZEJ5IiwiQXJyYXkiLCJpc0FycmF5Iiwic29ydGVkU29uZ3MiLCJsaWJyYXJ5IiwiZ2V0RWxlbWVudEJ5SWQiLCJmb3JFYWNoIiwiYXBwZW5kIiwiX3JlZ2lzdGVyQWRkVG9QbGF5bGlzdEV2ZW50cyIsIl9yZWdpc3RlclNvcnRFdmVudHMiLCJzb3J0QnV0dG9ucyIsInNldEFjdGl2ZSIsInByZXZBY3RpdmVCdXR0b24iLCJzb3J0RXZlbnRIYW5kbGVyIiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsImtleSIsImJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJfc2hvd1BsYXlsaXN0U2VsZWN0aW9uRm9yIiwib3ZlcmxheSIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiX2hpZGVQbGF5bGlzdExpc3RTZWxlY3RvciIsIl9hZGRUb1BsYXlsaXN0SGFuZGxlciIsInNvbmdFbCIsImNsb3Nlc3QiLCJidXR0b25zIiwiX2xvYWRMaXN0U2VsZWN0b3IiLCJsaXN0U2VsZWN0b3IiLCJhZGRUb0xpc3RTZWxlY3RvciIsInBsYXlsaXN0RWwiLCJ0ZXh0Q29udGVudCIsInNlbGVjdGVkUGxheWxpc3QiLCJzZWxlY3RlZFNvbmdJZCIsImluY2x1ZGVzIiwicHVzaCIsIl9yZWdpc3RlclBsYXlsaXN0U2VsZWN0b3JFdmVudHMiLCJjbG9zZUJ1dHRvbiIsImNsb3NlTGlzdFNlbGVjdG9ySGFuZGxlciIsInRhcmdldCIsIl9yZWdpc3RlckxpYnJhcnlFdmVudHMiLCJfbGlicmFyeVVJIiwiX3BsYXlsaXN0Q2xpY2tIYW5kbGVyIiwicGxheWxpc3REZXRhaWxzVGFiVmlldyIsInBsYXlsaXN0SGVhZGVyIiwicXVlcnlTZWxlY3RvciIsInBsYXlsaXN0U29uZ0xpc3QiLCJhZGRCdXR0b24iLCJfbG9hZFBsYXlsaXN0cyIsIl9wbGF5bGlzdFVJIiwiX3BsYXlsaXN0c01hdGNoaW5nIiwic2VhcmNoS2V5Iiwic2VhcmNoS2V5RXhwIiwidGVzdCIsIl9zb25nc01hdGNoaW5nIiwiX3JlZ2lzdGVyU2VhcmNoRXZlbnRzIiwic2VhcmNoQmFyIiwiZG9wcGxlIiwicGxheWxpc3RSZXN1bHRzIiwic29uZ1Jlc3VsdHMiLCJ2YWx1ZSIsIm1hdGNoaW5nUGxheWxpc3RzIiwibWF0Y2hpbmdTb25ncyIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiZm9jdXMiLCJfc2VhcmNoVUkiLCJfcmVnaXN0ZXJUYWJFdmVudHMiLCJ0YWJzIiwic2V0QWN0aXZlVGFiIiwiYWN0aXZlVGFiRWwiLCJ0YWIiLCJ0YWJDbGlja0hhbmRsZXIiLCJhcHBVSSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQSxLQUFJQSxpQkFBaUIsT0FBckI7QUFDQSxLQUFJQyxrQkFBa0IsUUFBdEI7O0FBRUEsS0FBSUMscUJBQXFCQyxTQUF6QjtBQUNBLEtBQUlDLHNCQUFzQkQsU0FBMUI7O0FBRUEsS0FBSUUsUUFBUUMsT0FBT0MsVUFBUCxHQUFvQkQsT0FBT0MsVUFBUCxDQUFrQkMsS0FBdEMsR0FBOENMLFNBQTFEO0FBQ0EsS0FBSU0sWUFBWUgsT0FBT0MsVUFBUCxHQUFvQkQsT0FBT0MsVUFBUCxDQUFrQkcsU0FBdEMsR0FBa0RQLFNBQWxFOztBQUVBLEtBQUlRLG9CQUFvQixTQUFwQkEsaUJBQW9CLENBQVNDLFVBQVQsRUFBcUI7QUFDekMsU0FBSSxDQUFDSCxTQUFMLEVBQWdCO0FBQ1osZ0JBQU9OLFNBQVA7QUFDSDtBQUNELFNBQUlTLGFBQWFDLFNBQVNELFVBQVQsQ0FBakI7QUFDQSxTQUFJRixZQUFZRCxVQUFVSyxNQUFWLENBQWlCLFVBQVNDLFFBQVQsRUFBbUI7QUFDakQsZ0JBQU9B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QUF0RDtBQUNBLGFBQUlLLFlBQVlqQixTQUFTa0MsY0FBVCxDQUF3QmlFLFlBQVloRyxPQUFaLENBQW9CaUcsR0FBcEIsR0FBMEIsY0FBbEQsQ0FBaEI7QUFDQXBGLDJCQUFrQkMsU0FBbEI7QUFDSCxNQUxEOztBQU9BLFNBQUlvRixrQkFBa0IsU0FBbEJBLGVBQWtCLENBQVMxRCxDQUFULEVBQVk7QUFDOUJBLFdBQUVDLGVBQUY7QUFDQU87QUFDQStDLHNCQUFhLElBQWI7QUFDSCxNQUpEOztBQU1BLFVBQUssSUFBSXJGLElBQUksQ0FBYixFQUFnQkEsSUFBSW9GLEtBQUt4RyxNQUF6QixFQUFrQ29CLEdBQWxDLEVBQXVDO0FBQ25DLGFBQUl1RixNQUFNSCxLQUFLcEYsQ0FBTCxDQUFWO0FBQ0F1RixhQUFJckQsZ0JBQUosQ0FBcUIsT0FBckIsRUFBOEJzRCxlQUE5QixFQUErQyxLQUEvQztBQUNIO0FBQ0osRUFyQkQ7O0FBdUJBLEtBQUlDLFFBQVEsU0FBUkEsS0FBUSxHQUFXO0FBQ25CaEM7QUFDQVE7QUFDQWlCOztBQUVBQztBQUNILEVBTkQ7O0FBUUFNLFM7Ozs7OztBQ3RXQSxtQkFBa0IsdUQ7Ozs7OztBQ0FsQjtBQUNBLHdDQUF1QywwQkFBMEI7QUFDakUseUNBQXdDO0FBQ3hDO0FBQ0EsRzs7Ozs7O0FDSkEsOEJBQTZCO0FBQzdCLHNDQUFxQyxnQyIsImZpbGUiOiJjbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiMTAzZmVkYjIxOWI0OGEzODk5MCIsInZhciBUSVRMRV9TT1JUX0tFWSA9ICd0aXRsZSc7XG52YXIgQVJUSVNUX1NPUlRfS0VZID0gJ2FydGlzdCc7XG5cbnZhciBUSVRMRV9TT1JURURfU09OR1MgPSB1bmRlZmluZWQ7XG52YXIgQVJUSVNUX1NPUlRFRF9TT05HUyA9IHVuZGVmaW5lZDtcblxudmFyIFNPTkdTID0gd2luZG93Lk1VU0lDX0RBVEEgPyB3aW5kb3cuTVVTSUNfREFUQS5zb25ncyA6IHVuZGVmaW5lZDtcbnZhciBQTEFZTElTVFMgPSB3aW5kb3cuTVVTSUNfREFUQSA/IHdpbmRvdy5NVVNJQ19EQVRBLnBsYXlsaXN0cyA6IHVuZGVmaW5lZDtcblxudmFyIGdldFBsYXlsaXN0V2l0aElkID0gZnVuY3Rpb24ocGxheWxpc3RJZCkge1xuICAgIGlmICghUExBWUxJU1RTKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHZhciBwbGF5bGlzdElkID0gcGFyc2VJbnQocGxheWxpc3RJZCk7XG4gICAgdmFyIHBsYXlsaXN0cyA9IFBMQVlMSVNUUy5maWx0ZXIoZnVuY3Rpb24ocGxheWxpc3QpIHtcbiAgICAgICByZXR1cm4gcGxheWxpc3QuaWQgPT09IHBsYXlsaXN0SWQ7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcGxheWxpc3RzLmxlbmd0aCA+IDAgPyBwbGF5bGlzdHNbMF0gOiB1bmRlZmluZWQ7XG59O1xuXG52YXIgZ2V0U29uZ1dpdGhJZCA9IGZ1bmN0aW9uKHNvbmdJZCkge1xuICAgIGlmICghU09OR1MpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdmFyIHNvbmdJZCA9IHBhcnNlSW50KHNvbmdJZCk7XG4gICAgdmFyIHNvbmdzID0gU09OR1MuZmlsdGVyKGZ1bmN0aW9uKHNvbmcpIHtcbiAgICAgICAgcmV0dXJuIHNvbmcuaWQgPT09IHNvbmdJZDtcbiAgICB9KTtcblxuICAgIHJldHVybiBzb25ncy5sZW5ndGggPiAwID8gc29uZ3NbMF0gOiB1bmRlZmluZWQ7XG59O1xuXG52YXIgX3NvbmdFbGVtZW50Rm9yID0gZnVuY3Rpb24oc29uZ09iaikge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsLmNsYXNzTmFtZSA9ICdjLXRhYmxlLWdyaWRfX2l0ZW0gYy1saWJyYXJ5X19pdGVtJztcbiAgICBlbC5kYXRhc2V0LmlkID0gc29uZ09iai5pZDtcbiAgICBlbC5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImMtbGlicmFyeV9faXRlbS1jb250ZW50IGMtdGFibGUtZ3JpZF9faXRlbS1jb250ZW50XCI+PGltZyBjbGFzcz1cImMtbGlicmFyeV9faXRlbS1hcnRcIiBzcmM9XCIuLi9hcHAvc3R5bGVzL2Fzc2V0cy9zb25nLWFydC0yMDAuanBnXCIgYWx0PVwiQWxidW0gQXJ0XCI+PGRpdiBjbGFzcz1cImMtbGlicmFyeV9faXRlbS10ZXh0IHUtZmxleC1jb2wgdS0tbWlkZGxlXCI+PGg0PicgKyBzb25nT2JqLnRpdGxlICsgJzwvaDQ+PGg1PicgKyBzb25nT2JqLmFydGlzdCArICc8L2g1PjwvZGl2PjxkaXYgY2xhc3M9XCJjLWxpYnJhcnlfX2l0ZW0tZGlzY2xvc3VyZVwiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIG5hbWU9XCJQbGF5XCIgY2xhc3M9XCJqcy1wbGF5IGMtYnV0dG9uIGMtLWRpc2Nsb3N1cmUgZ2x5cGhpY29uIGdseXBoaWNvbi1wbGF5XCI+PC9idXR0b24+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cIkFkZCBUbyBQbGF5bGlzdFwiIGNsYXNzPVwianMtYWRkLXRvLXBsYXlsaXN0IGMtYnV0dG9uIGMtLWRpc2Nsb3N1cmUgZ2x5cGhpY29uIGdseXBoaWNvbi1wbHVzLXNpZ25cIj48L2J1dHRvbj48L2Rpdj48L2Rpdj4nO1xuXG4gICAgcmV0dXJuIGVsO1xufTtcblxudmFyIF9wbGF5bGlzdEVsZW1lbnRGb3IgPSBmdW5jdGlvbihwbGF5bGlzdE9iaikge1xuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVsLmNsYXNzTmFtZSA9ICdjLXRhYmxlLWdyaWRfX2l0ZW0gYy1wbGF5bGlzdF9faXRlbSc7XG4gICAgZWwuZGF0YXNldC5pZCA9IHBsYXlsaXN0T2JqLmlkO1xuICAgIGVsLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiYy1wbGF5bGlzdF9faXRlbS1jb250ZW50IGMtdGFibGUtZ3JpZF9faXRlbS1jb250ZW50XCI+PGltZyBjbGFzcz1cImMtcGxheWxpc3RfX2l0ZW0tYXJ0XCIgc3JjPVwiLi4vYXBwL3N0eWxlcy9hc3NldHMvcGxheWxpc3QtYXJ0LTIwMC5qcGdcIiBhbHQ9XCJQbGF5bGlzdCBBcnRcIj48ZGl2IGNsYXNzPVwiYy1wbGF5bGlzdF9faXRlbS10ZXh0IHUtZmxleC1jb2wgdS0tbWlkZGxlXCI+PGg0PicgKyBwbGF5bGlzdE9iai5uYW1lICsgJzwvaDQ+PC9kaXY+PGRpdiBjbGFzcz1cImMtcGxheWxpc3RfX2l0ZW0tZGlzY2xvc3VyZVwiPjxzcGFuIGNsYXNzPVwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0XCI+PC9zcGFuPjwvZGl2PjwvZGl2Pic7XG5cbiAgICByZXR1cm4gZWw7XG59XG5cbnZhciBfcmVtb3ZlQWN0aXZlQ2xhc3NGcm9tID0gZnVuY3Rpb24oZUxpc3QpIHtcbiAgICB2YXIgYWN0aXZlQ2xhc3MgPSAnYy0tYWN0aXZlJztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlbCA9IGVMaXN0W2ldO1xuICAgICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShSZWdFeHAoJ1xcXFxiJyArIGFjdGl2ZUNsYXNzICsgJ1xcXFxiJyksICcnKTs7XG4gICAgfVxufTtcblxudmFyIF9zZXRUYWJWaWV3QWN0aXZlID0gZnVuY3Rpb24odGFiVmlld0VsKSB7XG4gICAgdmFyIGFjdGl2ZUNsYXNzID0gJ2MtLWFjdGl2ZSc7XG4gICAgdmFyIHRhYlZpZXdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndC10YWInKTtcbiAgICBfcmVtb3ZlQWN0aXZlQ2xhc3NGcm9tKHRhYlZpZXdzKTtcblxuICAgIHRhYlZpZXdFbC5jbGFzc05hbWUgPSB0YWJWaWV3RWwuY2xhc3NOYW1lICsgJyAnICsgYWN0aXZlQ2xhc3M7XG59O1xuXG4vLyBMaWJyYXJ5IFVJXG4vLyAtLS1cbnZhciBfZ2V0U29uZ3NTb3J0ZWRCeSA9IGZ1bmN0aW9uKHNvcnRLZXkpIHtcbiAgICB2YXIgc29ydFNvbmdzQnkgPSBmdW5jdGlvbihzb3J0S2V5KSB7XG4gICAgICAgIHJldHVybiBTT05HUy5zb3J0KGZ1bmN0aW9uKHNvbmdBLCBzb25nQikge1xuICAgICAgICAgICAgdmFyIGluQXNjZW5kaW5nT3JkZXIgPSBzb25nQVtzb3J0S2V5XS5yZXBsYWNlKC9eVGhlKFxccykrL2ksICcnKSA8PSBzb25nQltzb3J0S2V5XS5yZXBsYWNlKC9eVGhlKFxccykrL2ksICcnKTtcbiAgICAgICAgICAgIHJldHVybiBpbkFzY2VuZGluZ09yZGVyID8gLTEgOiAxO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHN3aXRjaCAoc29ydEtleSkge1xuICAgICAgICBjYXNlIFRJVExFX1NPUlRfS0VZOlxuICAgICAgICAgICAgaWYgKCFUSVRMRV9TT1JURURfU09OR1MpIHtcbiAgICAgICAgICAgICAgICBUSVRMRV9TT1JURURfU09OR1MgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNvcnRTb25nc0J5KFRJVExFX1NPUlRfS0VZKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFRJVExFX1NPUlRFRF9TT05HUztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGlmICghQVJUSVNUX1NPUlRFRF9TT05HUykge1xuICAgICAgICAgICAgICAgIEFSVElTVF9TT1JURURfU09OR1MgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNvcnRTb25nc0J5KEFSVElTVF9TT1JUX0tFWSkpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBBUlRJU1RfU09SVEVEX1NPTkdTO1xuICAgIH1cbn07XG5cbnZhciBfbG9hZFNvbmdzU29ydGVkQnkgPSBmdW5jdGlvbihzb3J0S2V5KSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KFNPTkdTKSB8fCBTT05HUy5sZW5ndGggPT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHNvcnRlZFNvbmdzID0gX2dldFNvbmdzU29ydGVkQnkoc29ydEtleSk7XG4gICAgdmFyIGxpYnJhcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlicmFyeScpO1xuXG4gICAgLy8gQ2xlYXIgYWxsIGV4aXN0aW5nIHNvbmdzXG4gICAgbGlicmFyeS5pbm5lckhUTUwgPSAnJztcbiAgICBzb3J0ZWRTb25ncy5mb3JFYWNoKGZ1bmN0aW9uKHNvbmdPYmopIHtcbiAgICAgICAgbGlicmFyeS5hcHBlbmQoX3NvbmdFbGVtZW50Rm9yKHNvbmdPYmopKTtcbiAgICB9KTtcblxuICAgIC8vIFRPRE86IHJlbW92ZSB3aGVuIGpRdWVyeSBpcyBhbGxvd2VkXG4gICAgX3JlZ2lzdGVyQWRkVG9QbGF5bGlzdEV2ZW50cygpO1xufTtcblxudmFyIF9yZWdpc3RlclNvcnRFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYWN0aXZlQ2xhc3MgPSAnYy0tYWN0aXZlJztcbiAgICB2YXIgc29ydEJ1dHRvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy1saWJyYXJ5LXNvcnQtYnV0dG9uJyk7XG5cbiAgICB2YXIgc2V0QWN0aXZlID0gZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgdmFyIHByZXZBY3RpdmVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy1saWJyYXJ5LXNvcnQtYnV0dG9uIGMtLWFjdGl2ZScpWzBdO1xuICAgICAgICBwcmV2QWN0aXZlQnV0dG9uLmNsYXNzTmFtZSA9IHByZXZBY3RpdmVCdXR0b24uY2xhc3NOYW1lLnJlcGxhY2UoUmVnRXhwKCdcXFxcYicgKyBhY3RpdmVDbGFzcyArICdcXFxcYicpLCAnJyk7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZSArICcgJyArIGFjdGl2ZUNsYXNzO1xuICAgIH07XG5cbiAgICB2YXIgc29ydEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgX2xvYWRTb25nc1NvcnRlZEJ5KHRoaXMuZGF0YXNldC5rZXkpO1xuICAgICAgICBzZXRBY3RpdmUodGhpcyk7XG4gICAgfTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc29ydEJ1dHRvbnMubGVuZ3RoIDsgaSsrKSB7XG4gICAgICAgIHZhciBidXR0b24gPSBzb3J0QnV0dG9uc1tpXTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc29ydEV2ZW50SGFuZGxlciwgZmFsc2UpO1xuICAgIH1cbn07XG5cbnZhciBfc2hvd1BsYXlsaXN0U2VsZWN0aW9uRm9yID0gZnVuY3Rpb24oc29uZ0lkKSB7XG4gICAgdmFyIG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjLW92ZXJsYXknKVswXTtcbiAgICBvdmVybGF5LmNsYXNzTmFtZSA9IG92ZXJsYXkuY2xhc3NOYW1lICsgJyBjLS12aXNpYmxlJztcbiAgICBvdmVybGF5LmRhdGFzZXQuc29uZ0lkID0gc29uZ0lkO1xuXG4gICAgLy8gVE9ETzogdXNlIGpRdWVyeSB0byBtYWtlIHRoaXMgbW9yZSByb2J1c3RcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmNsYXNzTmFtZSA9ICd1LW5vLXNjcm9sbCc7XG59O1xuXG52YXIgX2hpZGVQbGF5bGlzdExpc3RTZWxlY3RvciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYy1vdmVybGF5JylbMF07XG4gICAgb3ZlcmxheS5jbGFzc05hbWUgPSBvdmVybGF5LmNsYXNzTmFtZS5yZXBsYWNlKCdjLS12aXNpYmxlJywgJycpO1xuXG4gICAgLy8gVE9ETzogdXNlIGpRdWVyeSB0byBtYWtlIHRoaXMgbW9yZSByb2J1c3RcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmNsYXNzTmFtZSA9ICcnO1xufTtcblxudmFyIF9hZGRUb1BsYXlsaXN0SGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHZhciBzb25nRWwgPSB0aGlzLmNsb3Nlc3QoJy5jLWxpYnJhcnlfX2l0ZW0nKTtcbiAgICBfc2hvd1BsYXlsaXN0U2VsZWN0aW9uRm9yKHBhcnNlSW50KHNvbmdFbC5kYXRhc2V0LmlkKSk7XG59O1xuXG52YXIgX3JlZ2lzdGVyQWRkVG9QbGF5bGlzdEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBidXR0b25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtYWRkLXRvLXBsYXlsaXN0Jyk7XG5cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnV0dG9ucy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgdmFyIGJ1dHRvbiA9IGJ1dHRvbnNbaV07XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9hZGRUb1BsYXlsaXN0SGFuZGxlciwgZmFsc2UpO1xuICAgIH1cbn07XG5cbnZhciBfbG9hZExpc3RTZWxlY3RvciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsaXN0U2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWxpc3QtbGlzdC1zZWxlY3RvcicpO1xuICAgIHZhciBhZGRUb0xpc3RTZWxlY3RvciA9IGZ1bmN0aW9uKHBsYXlsaXN0KSB7XG4gICAgICAgIHZhciBwbGF5bGlzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgcGxheWxpc3RFbC5jbGFzc05hbWUgPSAnYy1saXN0LXNlbGVjdG9yX19pdGVtJztcbiAgICAgICAgcGxheWxpc3RFbC50ZXh0Q29udGVudCA9IHBsYXlsaXN0Lm5hbWU7XG4gICAgICAgIHBsYXlsaXN0RWwuZGF0YXNldC5pZCA9IHBsYXlsaXN0LmlkO1xuICAgICAgICBsaXN0U2VsZWN0b3IuYXBwZW5kKHBsYXlsaXN0RWwpO1xuXG4gICAgICAgIHBsYXlsaXN0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkUGxheWxpc3QgPSBnZXRQbGF5bGlzdFdpdGhJZCh0aGlzLmRhdGFzZXQuaWQpO1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkU29uZ0lkID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYy1vdmVybGF5JylbMF0uZGF0YXNldC5zb25nSWQpO1xuICAgICAgICAgICAgaWYgKCEhc2VsZWN0ZWRQbGF5bGlzdCAmJiAhc2VsZWN0ZWRQbGF5bGlzdC5zb25ncy5pbmNsdWRlcyhzZWxlY3RlZFNvbmdJZCkpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFBsYXlsaXN0LnNvbmdzLnB1c2goc2VsZWN0ZWRTb25nSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2hpZGVQbGF5bGlzdExpc3RTZWxlY3RvcigpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgX3JlZ2lzdGVyUGxheWxpc3RTZWxlY3RvckV2ZW50cygpO1xuICAgIFBMQVlMSVNUUy5mb3JFYWNoKGFkZFRvTGlzdFNlbGVjdG9yKTtcbn07XG5cbnZhciBfcmVnaXN0ZXJQbGF5bGlzdFNlbGVjdG9yRXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjLW92ZXJsYXknKVswXTtcbiAgICB2YXIgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjLWxpc3Qtc2VsZWN0b3JfX2Nsb3NlLWJ1dHRvbicpWzBdO1xuICAgIHZhciBjbG9zZUxpc3RTZWxlY3RvckhhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vIElnbm9yZSBpZiB0aGUgZXZlbnQgc291cmNlIGlzIG5vdCB0aGUgbGlzdGVuZXJcbiAgICAgICAgaWYgKHRoaXMgPT09IGUudGFyZ2V0KSB7XG4gICAgICAgICAgICBfaGlkZVBsYXlsaXN0TGlzdFNlbGVjdG9yKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgb3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTGlzdFNlbGVjdG9ySGFuZGxlcik7XG4gICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZUxpc3RTZWxlY3RvckhhbmRsZXIpO1xufTtcblxudmFyIF9yZWdpc3RlckxpYnJhcnlFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgICBfcmVnaXN0ZXJTb3J0RXZlbnRzKCk7XG59O1xuXG52YXIgX2xpYnJhcnlVSSA9IGZ1bmN0aW9uKCkge1xuICAgIF9sb2FkU29uZ3NTb3J0ZWRCeShBUlRJU1RfU09SVF9LRVkpO1xuICAgIF9sb2FkTGlzdFNlbGVjdG9yKCk7XG4gICAgX3JlZ2lzdGVyTGlicmFyeUV2ZW50cygpO1xufTtcblxuLy8gUGxheWxpc3QgVUlcbi8vIC0tLVxuXG52YXIgX3BsYXlsaXN0Q2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdmFyIHBsYXlsaXN0RGV0YWlsc1RhYlZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWxpc3QtZGV0YWlscycpO1xuICAgIHBsYXlsaXN0RGV0YWlsc1RhYlZpZXcuZGF0YXNldC5wbGF5bGlzdElkID0gdGhpcy5kYXRhc2V0LmlkO1xuXG4gICAgdmFyIHBsYXlsaXN0SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmMtcGxheWxpc3QtZGV0YWlsc19faGVhZGluZy1jb250YWluZXIgaDEnKTtcbiAgICB2YXIgcGxheWxpc3RTb25nTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGF5bGlzdC1zb25nLWxpc3QnKTtcbiAgICB2YXIgcGxheWxpc3RPYmogPSBnZXRQbGF5bGlzdFdpdGhJZCh0aGlzLmRhdGFzZXQuaWQpO1xuXG4gICAgcGxheWxpc3RIZWFkZXIudGV4dENvbnRlbnQgPSBwbGF5bGlzdE9iai5uYW1lO1xuICAgIHBsYXlsaXN0U29uZ0xpc3QuaW5uZXJIVE1MID0gJyc7XG4gICAgcGxheWxpc3RPYmouc29uZ3MuZm9yRWFjaChmdW5jdGlvbihzb25nSWQpIHtcbiAgICAgICAgdmFyIHNvbmdFbCA9IF9zb25nRWxlbWVudEZvcihnZXRTb25nV2l0aElkKHNvbmdJZCkpO1xuICAgICAgICB2YXIgYWRkQnV0dG9uID0gc29uZ0VsLnF1ZXJ5U2VsZWN0b3IoJy5qcy1hZGQtdG8tcGxheWxpc3QnKTtcbiAgICAgICAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2FkZFRvUGxheWxpc3RIYW5kbGVyKTtcbiAgICAgICAgcGxheWxpc3RTb25nTGlzdC5hcHBlbmQoc29uZ0VsKTtcbiAgICB9KTtcbiAgICBfc2V0VGFiVmlld0FjdGl2ZShwbGF5bGlzdERldGFpbHNUYWJWaWV3KTtcbn07XG5cbnZhciBfbG9hZFBsYXlsaXN0cyA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShQTEFZTElTVFMpIHx8IFBMQVlMSVNUUy5sZW5ndGggPT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHBsYXlsaXN0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5bGlzdHMnKTtcbiAgICBwbGF5bGlzdHMuaW5uZXJIVE1MID0gJyc7XG5cbiAgICBQTEFZTElTVFMuZm9yRWFjaChmdW5jdGlvbihwbGF5bGlzdE9iaikge1xuICAgICAgICB2YXIgcGxheWxpc3RFbCA9IF9wbGF5bGlzdEVsZW1lbnRGb3IocGxheWxpc3RPYmopO1xuICAgICAgICBwbGF5bGlzdEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX3BsYXlsaXN0Q2xpY2tIYW5kbGVyKTtcblxuICAgICAgICBwbGF5bGlzdHMuYXBwZW5kKHBsYXlsaXN0RWwpO1xuICAgIH0pO1xufTtcblxudmFyIF9wbGF5bGlzdFVJID0gZnVuY3Rpb24oKSB7XG4gICAgX2xvYWRQbGF5bGlzdHMoKTtcbn07XG5cbi8vIFNlYXJjaCBVSVxuLy8gLS0tXG52YXIgX3BsYXlsaXN0c01hdGNoaW5nID0gZnVuY3Rpb24oc2VhcmNoS2V5KSB7XG4gICAgdmFyIHNlYXJjaEtleUV4cCA9IG5ldyBSZWdFeHAoc2VhcmNoS2V5LCAnaScpO1xuICAgIHJldHVybiBQTEFZTElTVFMuZmlsdGVyKGZ1bmN0aW9uKHBsYXlsaXN0KSB7XG4gICAgICAgIHJldHVybiBzZWFyY2hLZXlFeHAudGVzdChwbGF5bGlzdC5uYW1lKTtcbiAgICB9KTtcbn07XG5cbnZhciBfc29uZ3NNYXRjaGluZyA9IGZ1bmN0aW9uKHNlYXJjaEtleSkge1xuICAgIHZhciBzZWFyY2hLZXlFeHAgPSBuZXcgUmVnRXhwKHNlYXJjaEtleSwgJ2knKTtcbiAgICByZXR1cm4gU09OR1MuZmlsdGVyKGZ1bmN0aW9uKHNvbmcpIHtcbiAgICAgICAgcmV0dXJuIHNlYXJjaEtleUV4cC50ZXN0KHNvbmcuYXJ0aXN0KSB8fCBzZWFyY2hLZXlFeHAudGVzdChzb25nLnRpdGxlKTtcbiAgICB9KTtcbn07XG5cbnZhciBfcmVnaXN0ZXJTZWFyY2hFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2VhcmNoQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlYXJjaC1iYXInKTtcbiAgICB2YXIgZG9wcGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYy1zZWFyY2gtYmFyX19kb3BwbGUnKVswXTtcbiAgICB2YXIgcGxheWxpc3RSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NlYXJjaC1yZXN1bHRzIC5jLXNlYXJjaF9fcGxheWxpc3QtcmVzdWx0cycpO1xuICAgIHZhciBzb25nUmVzdWx0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzZWFyY2gtcmVzdWx0cyAuYy1zZWFyY2hfX3NvbmctcmVzdWx0cycpO1xuXG4gICAgc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICBwbGF5bGlzdFJlc3VsdHMuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHNvbmdSZXN1bHRzLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIGlmIChzZWFyY2hCYXIudmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1hdGNoaW5nUGxheWxpc3RzID0gX3BsYXlsaXN0c01hdGNoaW5nKHNlYXJjaEJhci52YWx1ZSk7XG4gICAgICAgIHZhciBtYXRjaGluZ1NvbmdzID0gX3NvbmdzTWF0Y2hpbmcoc2VhcmNoQmFyLnZhbHVlKTtcblxuICAgICAgICBtYXRjaGluZ1BsYXlsaXN0cy5mb3JFYWNoKGZ1bmN0aW9uKHBsYXlsaXN0T2JqKSB7XG4gICAgICAgICAgICB2YXIgcGxheWxpc3RFbCA9IF9wbGF5bGlzdEVsZW1lbnRGb3IocGxheWxpc3RPYmopO1xuICAgICAgICAgICAgcGxheWxpc3RFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIF9wbGF5bGlzdENsaWNrSGFuZGxlcik7XG4gICAgICAgICAgICBwbGF5bGlzdFJlc3VsdHMuYXBwZW5kKHBsYXlsaXN0RWwpO1xuICAgICAgICB9KTtcblxuICAgICAgICBtYXRjaGluZ1NvbmdzLmZvckVhY2goZnVuY3Rpb24oc29uZ09iaikge1xuICAgICAgICAgICAgdmFyIHNvbmdFbCA9IF9zb25nRWxlbWVudEZvcihzb25nT2JqKTtcbiAgICAgICAgICAgIHZhciBhZGRCdXR0b24gPSBzb25nRWwucXVlcnlTZWxlY3RvcignLmpzLWFkZC10by1wbGF5bGlzdCcpO1xuICAgICAgICAgICAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgX2FkZFRvUGxheWxpc3RIYW5kbGVyKTtcbiAgICAgICAgICAgIHNvbmdSZXN1bHRzLmFwcGVuZChzb25nRWwpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlYXJjaEJhci5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhY3RpdmVDbGFzcyA9ICdjLS1hY3RpdmUnO1xuICAgICAgICBpZiAoc2VhcmNoQmFyLnZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2VhcmNoQmFyLmNsYXNzTmFtZSA9IHNlYXJjaEJhci5jbGFzc05hbWUucmVwbGFjZShhY3RpdmVDbGFzcywgJycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlYXJjaEJhci5jbGFzc0xpc3QuY29udGFpbnMoYWN0aXZlQ2xhc3MpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZWFyY2hCYXIuY2xhc3NOYW1lID0gc2VhcmNoQmFyLmNsYXNzTmFtZSArICcgJyArIGFjdGl2ZUNsYXNzO1xuICAgIH0pO1xuXG4gICAgZG9wcGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBzZWFyY2hCYXIuZm9jdXMoKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbn07XG5cbnZhciBfc2VhcmNoVUkgPSBmdW5jdGlvbigpIHtcbiAgICBfcmVnaXN0ZXJTZWFyY2hFdmVudHMoKTtcbn07XG5cbi8vIEV2ZW50IEhhbmRsaW5nXG4vLyAtLS1cbnZhciBfcmVnaXN0ZXJUYWJFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYWN0aXZlQ2xhc3MgPSAnYy0tYWN0aXZlJztcbiAgICB2YXIgdGFicyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2MtbmF2LWJhcl9fdGFiJyk7XG5cbiAgICB2YXIgc2V0QWN0aXZlVGFiID0gZnVuY3Rpb24oYWN0aXZlVGFiRWwpIHtcbiAgICAgICAgX3JlbW92ZUFjdGl2ZUNsYXNzRnJvbSh0YWJzKTtcbiAgICAgICAgYWN0aXZlVGFiRWwuY2xhc3NOYW1lID0gYWN0aXZlVGFiRWwuY2xhc3NOYW1lICsgJyAnICsgYWN0aXZlQ2xhc3M7XG4gICAgICAgIHZhciB0YWJWaWV3RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChhY3RpdmVUYWJFbC5kYXRhc2V0LnRhYiArICctdGFiLWNvbnRlbnQnKTtcbiAgICAgICAgX3NldFRhYlZpZXdBY3RpdmUodGFiVmlld0VsKTtcbiAgICB9O1xuXG4gICAgdmFyIHRhYkNsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgX2hpZGVQbGF5bGlzdExpc3RTZWxlY3RvcigpO1xuICAgICAgICBzZXRBY3RpdmVUYWIodGhpcyk7XG4gICAgfTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFicy5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgdmFyIHRhYiA9IHRhYnNbaV07XG4gICAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRhYkNsaWNrSGFuZGxlciwgZmFsc2UpO1xuICAgIH1cbn07XG5cbnZhciBhcHBVSSA9IGZ1bmN0aW9uKCkge1xuICAgIF9saWJyYXJ5VUkoKTtcbiAgICBfcGxheWxpc3RVSSgpO1xuICAgIF9zZWFyY2hVSSgpO1xuXG4gICAgX3JlZ2lzdGVyVGFiRXZlbnRzKCk7XG59O1xuXG5hcHBVSSgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2FwcC9hcHAuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBjb3JlICA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKVxuICAsICRKU09OID0gY29yZS5KU09OIHx8IChjb3JlLkpTT04gPSB7c3RyaW5naWZ5OiBKU09OLnN0cmluZ2lmeX0pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHJldHVybiAkSlNPTi5zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3VtZW50cyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnkuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9