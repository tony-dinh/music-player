const Request = {}

Request.getMusicData = function(key) {
    return new Promise ((resolve, reject) => {
        $.get(`/api/${key}`, (data, status, xhr) => {
            if (xhr.status !== 200) {
                console.error(`Failed to retrieve ${key}`)
                reject()
            }
            resolve(data[key])
        })
    })
}

Request.postPlaylistData = async function() {
    return new Promise((resolve, reject) => {
        $.post('/api/playlists', JSON.stringify({playlists: PLAYLISTS}), (data, status, xhr) => {
            if (xhr.status !== 200) {
                console.error('Failed to post playlist data')
                reject()
            }
            resolve()
        })
    })
}

export default Request
