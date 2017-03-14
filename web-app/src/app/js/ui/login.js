import Request from '../global/request'

const LOGIN_BUTTON_SELECTOR = '.js-login-button'
const LOGIN_FORM_SELECTOR = '.js-login-form'

const _bindEvents = function() {
    const submitFormHandler = function(e) {
        e.preventDefault()
        const loginInfo = {
            username: $('.js-username-input').val(),
            password: $('.js-password-input').val()
        }
        Request.submitLogin(loginInfo)
            .then((data) => {
                console.log(data)
            }).catch((err) => console.log(err))
    }

    $(LOGIN_FORM_SELECTOR).on('submit', submitFormHandler)
    $(LOGIN_BUTTON_SELECTOR).on('click', submitFormHandler)
}

const LoginUI = function() {
    _bindEvents()
}

export default LoginUI
