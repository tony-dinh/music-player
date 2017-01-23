const Utils = {}

Utils.getObjWithId = function(arr, id) {
    if (!arr || arr.length === 0) {
        return undefined
    }
    const objId = parseInt(id);
    const matches = arr.filter((obj) => { return obj.id === objId })

    return matches.length > 0 ? matches[0] : undefined
}

Utils.songElementFor = function(songObj) {
    const songElClass = 'c-table-grid__item c-library__item'
    const songElHTML = '<div class="c-library__item-content c-table-grid__item-content"><img class="c-library__item-art" src="../app/styles/assets/song-art-200.jpg" alt="Album Art"><div class="c-library__item-text u-flex-col u--middle"><h4>' + songObj.title + '</h4><h5>' + songObj.artist + '</h5></div><div class="c-library__item-disclosure"><button type="button" name="Play" class="js-play c-button c--disclosure glyphicon glyphicon-play"></button><button type="button" name="Add To Playlist" class="js-add-to-playlist c-button c--disclosure glyphicon glyphicon-plus-sign"></button></div></div>'

    return $('<div></div>')
        .addClass(songElClass)
        .attr('data-id', songObj.id)
        .html(songElHTML)
}

Utils.playlistElementFor = function(playlistObj) {
    const playlistElClass = 'c-table-grid__item c-playlist__item'
    const playlistElHTML = '<div class="c-playlist__item-content c-table-grid__item-content"><img class="c-playlist__item-art" src="../app/styles/assets/playlist-art-200.jpg" alt="Playlist Art"><div class="c-playlist__item-text u-flex-col u--middle"><h4>' + playlistObj.name + '</h4></div><div class="c-playlist__item-disclosure"><span class="glyphicon glyphicon-chevron-right"></span></div></div>'

    return $('<div></div>')
        .addClass(playlistElClass)
        .attr('data-id', playlistObj.id)
        .html(playlistElHTML)
}

Utils.sortSongsBy = function(sortKey) {
    const titleSortKey = 'title';
    const artistSortKey = 'artist';
}

export default Utils
