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

Request.addNewPlaylist = function(playlist) {
    return new Promise((resolve, reject) => {
        $.post('/api/playlists/', playlist, (data, status, xhr) => {
            if (xhr.status !== 200) {
                reject(`[ Request ] Failed to add new playlist: ${status}`)
            }
            resolve(data)
        }, 'json')
    })
}

Request.addSongToPlaylist = function(songId, playlistId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `api/playlists/${playlistId}`,
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify({song: songId}),
            success: (data, status, xhr) => {
                if (xhr.status !== 200) {
                    reject(`[ Request ] Failed to add song to playlist: ${status}`)
                }
                resolve()
            },
            error: () => {
                reject(`[ Request ] Failed to add song to playlist: ${status}`)
            }
        });
    })
}

Request.removeSongFromPlaylist = async function(songId, playlistId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/playlists/${playlistId}`,
            contentType: 'application/json',
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

Request.submitLogin = async function(data) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/login',
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify(data),
            success: (data, status, xhr) => {
                if (xhr.status !== 200) {
                    reject(`[ Request ] Login Failed`)
                }
                resolve(data)
            },
            error: () => {
                reject(`[ Request ] Login Failed`)
            }

        })
    })
}

export default Request
