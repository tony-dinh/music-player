const OVERLAY_SELECTOR = '.c-overlay'
const VISIBLE_CLASS = 'c--visible'
const HIDDEN_CLASS = 'u-hidden'

const Overlay = {}

Overlay.show = function() {
    $(OVERLAY_SELECTOR).addClass(VISIBLE_CLASS)
}

Overlay.hide = function() {
    $(OVERLAY_SELECTOR).removeClass(VISIBLE_CLASS)
    $('.js-overlay-modal').addClass(HIDDEN_CLASS)
}

const _bindEvents = function() {
    $('body').on('click', OVERLAY_SELECTOR, function(e) {
        e.stopPropagation()
        if (this === e.target) {
            Overlay.hide()
        }
    })
}

const _OverlayUI = function() {
    _bindEvents()
}

_OverlayUI()

export default Overlay
