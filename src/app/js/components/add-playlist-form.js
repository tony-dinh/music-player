import Events from '../global/events'
import Request from '../global/request'

import Overlay from './overlay'

const ADD_BTN_SELECTOR = '.c-add-playlist-form .js-add'
const CANCEL_BTN_SELECTOR = '.c-add-playlist-form .js-cancel'
const FORM_CONTAINER_SELECTOR = '.c-add-playlist-form__container'
const FORM_SELECTOR = '.c-add-playlist-form__container form'
const NAME_INPUT_SELECTOR = '.js-playlist-name-input'
const HIDDEN_CLASS = 'u-hidden'

const AddPlaylistForm = {}

AddPlaylistForm.show = function() {
    // We don't want the content behind the overlay to be scrollable
    $('body').addClass('u-no-scroll')
    Overlay.show()
    $(FORM_CONTAINER_SELECTOR).removeClass(HIDDEN_CLASS)
    $(NAME_INPUT_SELECTOR).focus()
}

AddPlaylistForm.hide = function() {
    $('body').removeClass('u-no-scroll')
    Overlay.hide()
}

const _bindEvents = function() {
    const $nameInput = $(NAME_INPUT_SELECTOR)
    const dismissFormHandler = function(e) {
        e.stopPropagation()
        AddPlaylistForm.hide()
        $nameInput.val('')
    }
    const formSubmissionHandler = async function(e) {
        // Prevent default form submission
        e.preventDefault()

        const playlist = {
            'name': $nameInput.val()
        }

        Request
            .addNewPlaylist(playlist)
            .then(function(playlistObj) {
                playlistObj.songs = playlistObj.songs || []
                PLAYLISTS.push(playlistObj)
                $('body').trigger(Events.names.PLAYLIST_ADDED, playlistObj)
                dismissFormHandler(e)
            })
            .catch(function(err) {
                console.log(err)
            })
    }

    $(FORM_SELECTOR).on('submit', formSubmissionHandler)
    $(CANCEL_BTN_SELECTOR).on('click', dismissFormHandler)
    $(ADD_BTN_SELECTOR).on('click', formSubmissionHandler)
}

const AddPlaylistFormUI = function() {
    _bindEvents()
}

export { AddPlaylistForm, AddPlaylistFormUI }
