import Utils from './utils'

const Common = {}

const _getMusicData = function(key) {
    return new Promise ((resolve, reject) => {
        $.get(`/api/${key}`, (data, status, xhr) => {
            if (xhr.status !== 200) {
                console.error(`Failed to retrieve ${key} data`)
                reject()
            }
            resolve(data[key])
        })
    })
}

Common.load = async function() {
    window.UTILS = Utils
    window.PLAYLISTS = await _getMusicData('playlists')
    window.SONGS = await _getMusicData('songs')
}

export default Common
