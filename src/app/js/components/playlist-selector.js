const OVERLAY_SELECTOR = '.c-overlay'
const VISIBLE_CLASS = 'c--visible'

const PlaylistSelector = {}

PlaylistSelector.showSelectionFor = function(songId) {
    // We don't want the content behind the overlay to be scrollable
    $('body').addClass('u-no-scroll')

    const $overlay = $(OVERLAY_SELECTOR)
    $overlay.addClass(VISIBLE_CLASS).attr('data-song-id', songId)
}

PlaylistSelector.hide = function() {
    $('body').removeClass('u-no-scroll')

    const $overlay = $(OVERLAY_SELECTOR)
    $overlay.removeClass(VISIBLE_CLASS)
}

// var _loadListSelector = function() {
//     var listSelector = document.getElementById('playlist-list-selector');
//     var addToListSelector = function(playlist) {
//         var playlistEl = document.createElement('li');
//         playlistEl.className = 'c-list-selector__item';
//         playlistEl.textContent = playlist.name;
//         playlistEl.dataset.id = playlist.id;
//         listSelector.append(playlistEl);
//
//         playlistEl.addEventListener('click', function(e) {
//             e.stopPropagation();
//             var selectedPlaylist = getPlaylistWithId(this.dataset.id);
//             var selectedSongId = parseInt(document.getElementsByClassName('c-overlay')[0].dataset.songId);
//             if (!!selectedPlaylist && !selectedPlaylist.songs.includes(selectedSongId)) {
//                 selectedPlaylist.songs.push(selectedSongId);
//             }
//             _hidePlaylistListSelector();
//         });
//     };
//
//     _registerPlaylistSelectorEvents();
//     PLAYLISTS.forEach(addToListSelector);
// }

export default PlaylistSelector
