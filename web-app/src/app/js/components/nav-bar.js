import Overlay from './overlay'
import { PlaylistSelectorUI } from './playlist-selector'

const NavBar = {}

NavBar.setTabViewActive = function($tabView) {
    const activeClass = 'c--active'

    $('.t-tab').removeClass(activeClass)
    $tabView.addClass(activeClass)
}

NavBar.setTabActive = function($tab, pushState) {
    const tab = $tab.data('tab')
    const activeTabViewSelector = `#${tab}-tab-content`

    _highlightTab($tab)
    NavBar.setTabViewActive($(activeTabViewSelector))

    if (pushState) {
        history.pushState({'tab': tab}, tab, '/' + tab)
    }
}

const _bindEvents = function() {
    $('body').on('click', '.c-nav-bar__tab', function(e) {
        e.stopPropagation()
        Overlay.hide()

        const $selectedTab = $(this)
        NavBar.setTabActive($selectedTab, true)
    })
}

const _highlightTab = function($tab) {
    const activeClass = 'c--active'
    const tab = $tab.data('tab')
    const activeTabViewSelector = `#${tab}-tab-content`

    $('.c-nav-bar__tab').removeClass(activeClass)
    $tab.addClass(activeClass)
}

const _selectInitialTab = function() {
    const pathMatchesTab = function(tab) {
        return (new RegExp('^/' + tab + '((/\\.*)|#)?')).test(location.pathname)
    }

    if (pathMatchesTab('library')) {
        NavBar.setTabActive($('.c-nav-bar__tab[data-tab=library]'))
    } else if (pathMatchesTab('search')) {
        NavBar.setTabActive($('.c-nav-bar__tab[data-tab=search]'))
    } else {
        NavBar.setTabActive($('.c-nav-bar__tab[data-tab=playlists]'))
    }
}

const NavBarUI = function() {
    PlaylistSelectorUI()
    _bindEvents()
    _selectInitialTab()
}

export { NavBar, NavBarUI }
