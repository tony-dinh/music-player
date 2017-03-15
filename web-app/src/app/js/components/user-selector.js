import Events from '../global/events'
import Request from '../global/request'

import Overlay from './overlay'

const LIST_SEL_SELECTOR = '.js-user-selector'
const USER_LIST_SELECTOR = '#user-list-selector'
const HIDDEN_CLASS = 'u-hidden'

const UserSelector = {}

UserSelector.showSelectionFor = function(playlistId) {
    // We don't want the content behind the overlay to be scrollable
    $('body').addClass('u-no-scroll')
    Overlay.show()
    Request.getUsers().then(function(users) {
        _addUsers(users)
    })
    const $userSelector = $(LIST_SEL_SELECTOR)
    $userSelector.removeClass(HIDDEN_CLASS).data('playlist-id', playlistId)
}

UserSelector.hide = function() {
    $('body').removeClass('u-no-scroll')
    Overlay.hide()
}

UserSelector.addUser = function(userObj) {
    const $userList = $(USER_LIST_SELECTOR)
    const $selectorEl = $('<li></li>')
    const selectorClass = 'c-list-selector__item'

    $selectorEl
        .addClass(selectorClass)
        .text(userObj.username)
        .data('id', userObj.id)

    $userList.append($selectorEl[0])
}

const _addUsers = function(users) {
    if (!$.isArray(users) || users.length === 0) {
        return
    }
    const $userList = $(USER_LIST_SELECTOR)
    $userList.html('')
    users.forEach(UserSelector.addUser)
}

const _bindEvents = function() {
    const $body = $('body')
    const $userSelector = $(LIST_SEL_SELECTOR)
    const $userSelCloseBtn = $('.js-user-selector .c-user-selector__close-button')

    $userSelCloseBtn.on('click', function(e) {
        e.stopPropagation()
        UserSelector.hide()
    })

    $body.on('click', '.js-user-selector .c-list-selector__item', function(e) {
        e.stopPropagation()
        const selectedPlaylistId = $userSelector.data('playlist-id')
        const userId = $(this).data('id')

        Request.grantUserPlaylistPermission({
            userId: userId,
            playlistId: selectedPlaylistId
        })
        // const playlistObj = UTILS.getObjWithId(PLAYLISTS, selectedPlaylistId)
        // if (!playlistObj.songs.includes(parseInt(selectedSongId))) {
        //     Request.addSongToPlaylist(selectedSongId, selectedPlaylistId)
        //         .then(function() {
        //             UTILS.addSongToPlaylist(selectedSongId, playlistObj)
        //         })
        //         .catch(function(err) {
        //             console.log(err)
        //         })
        // }
        UserSelector.hide()
    })
}

const UserSelectorUI = function() {
    _bindEvents()
}

export { UserSelector, UserSelectorUI }
