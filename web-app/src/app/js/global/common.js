import Utils from './utils'
import Request from './request'

const Common = {}

Common.load = async function() {
    window.UTILS = Utils
    window.PLAYLISTS = await Request.getMusicData('playlists')
    window.SONGS = await Request.getMusicData('songs')
}

export default Common
