const OVERLAY_SELECTOR = '.c-overlay'
const VISIBLE_CLASS = 'c--visible'
const HIDDEN_CLASS = 'u-hidden'

const Overlay = {}

Overlay.show = function() {
    $(OVERLAY_SELECTOR).addClass(VISIBLE_CLASS)
}

Overlay.hide = function() {
    $(OVERLAY_SELECTOR).removeClass(VISIBLE_CLASS)
}

const _bindEvents = function() {
    $(OVERLAY_SELECTOR).on('click', function(e) {
        e.stopPropagation()
        if (this === e.target) {
            Overlay.hide()

            // Hide all modals as well
            $('.js-overlay-modal').addClass(HIDDEN_CLASS)
        }
    })
}

const _OverlayUI = function() {
    _bindEvents()
}

_OverlayUI()

export default Overlay
