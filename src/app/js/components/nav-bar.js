import PlaylistSelector from './playlist-selector'

const NavBar = {}

NavBar.setTabViewActive = function($tabView) {
    const activeClass = 'c--active'

    $('.t-tab').removeClass(activeClass)
    $tabView.addClass(activeClass)
}

NavBar.setTabActive = function($tab) {
    const activeClass = 'c--active'
    const activeTabViewSelector = '#' + $tab.data('tab') + '-tab-content'

    $('.c-nav-bar__tab').removeClass(activeClass)
    $tab.addClass(activeClass)

    NavBar.setTabViewActive($(activeTabViewSelector))
}

const _bindEvents = function() {
    $('body').on('click', '.c-nav-bar__tab', function(e) {
        e.stopPropagation()
        PlaylistSelector.hide()

        const $selectedTab = $(this)
        const tab = $selectedTab.data('tab')
        NavBar.setTabActive($selectedTab)

        if (document.origin !== "null") {
            history.pushState({'tab': tab}, tab, '/' + tab)
        }
    })
}

const _selectInitialTab = function() {
    const pathMatchesTab = function(tab) {
        return (new RegExp('^/' + tab + '(/*)?#?')).test(location.pathname)
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
    _bindEvents()
    _selectInitialTab()
}

export {NavBar, NavBarUI}
