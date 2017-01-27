import Events from '../global/events'

import Overlay from './overlay'
import { Playlists } from '../ui/playlists'

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
}

AddPlaylistForm.hide = function() {
    $('body').removeClass('u-no-scroll')
    Overlay.hide()
    $(FORM_CONTAINER_SELECTOR).addClass(HIDDEN_CLASS)
}

const _postPlaylistData = async function() {

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

        const playlistObj = {
            'id': PLAYLISTS.length,
            'name': $nameInput.val(),
            'songs': []
        }
        $('body').trigger(Events.names.ADD_PLAYLIST, playlistObj)
        dismissFormHandler(e)
    }
    $(FORM_SELECTOR).on('submit', formSubmissionHandler)
    $(CANCEL_BTN_SELECTOR).on('click', dismissFormHandler)
    $(ADD_BTN_SELECTOR).on('click', formSubmissionHandler)

    // We want to post playlist data whenever a playlist is added
    $('body').on(Events.names.ADD_PLAYLIST, function(e, playlistObj) {
        PLAYLISTS.push(playlistObj)
        _postPlaylistData()
    })
}

const AddPlaylistFormUI = function() {
    _bindEvents()
}

export { AddPlaylistForm, AddPlaylistFormUI }
