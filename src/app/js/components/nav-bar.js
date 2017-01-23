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

NavBar.bindEvents = function() {
    $('body').on('click', '.c-nav-bar__tab', function(e) {
        e.stopPropagation()
        PlaylistSelector.hide()

        NavBar.setTabActive($(this))
    })
}

export default NavBar
