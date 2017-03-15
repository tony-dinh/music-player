import Events from '../global/events'
import Request from '../global/request'
import { NavBar } from '../components/nav-bar'

const LOGIN_BUTTON_SELECTOR = '.js-login-button'
const LOGIN_FORM_SELECTOR = '.js-login-form'

const _redirectToApp = function() {
    const hiddenClass = 'u-hidden'
    const $loginPage = $('#login-page')
    const $playlistApp = $('#playlist-app')

    $playlistApp.removeClass(hiddenClass)
    $loginPage.addClass(hiddenClass)

    NavBar.setTabActive($('.c-nav-bar__tab[data-tab="playlists"]'), true)
}

const _bindEvents = function() {
    const $body = $('body')
    const submitFormHandler = function(e) {
        e.preventDefault()
        const loginInfo = {
            username: $('.js-username-input').val(),
            password: $('.js-password-input').val()
        }
        Request.submitLogin(loginInfo)
            .then((data) => {
                $body.trigger(Events.names.SIGNED_IN)
                $body.trigger(Events.names.PLAYLISTS_UPDATE_NEEDED)
            }).catch((err) => console.log(err))
    }

    $(LOGIN_FORM_SELECTOR).on('submit', submitFormHandler)
    $(LOGIN_BUTTON_SELECTOR).on('click', submitFormHandler)

    $body.on(Events.names.SIGNED_IN, _redirectToApp)
}

const LoginUI = function() {
    _bindEvents()
}

export default LoginUI
