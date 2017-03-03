const Request = {}

Request.getMusicData = async function(key) {
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

Request.addNewPlaylist = async function(playlist) {
    return new Promise((resolve, reject) => {
        $.post('/api/playlists/', JSON.stringify(playlist), (data, status, xhr) => {
            if (xhr.status !== 200) {
                reject(`[ Request ] Failed to add new playlist: ${status}`)
            }
            resolve(data)
        })
    })
}

Request.addSongToPlaylist = async function(songId, playlistId) {
    return new Promise((resolve, reject) => {
        $.post(`/api/playlists/${playlistId}`, JSON.stringify({song: songId}), (data, status, xhr) => {
            if (xhr.status !== 200) {
                reject(`[ Request ] Failed to add song to playlist: ${status}`)
            }
            resolve()
        })
    })
}

Request.removeSongFromPlaylist = async function(songId, playlistId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/playlists/${playlistId}`,
            type: 'DELETE',
            data: JSON.stringify({song: songId}),
            success: (data, status, xhr) => {
                if (xhr.status !== 200) {
                    reject(`[ Request ] Failed to remove song from playlist: ${status}`)
                }
                resolve()
            }
        })
    })
}

export default Request
