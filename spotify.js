var getFromApi = function(endpoint, query={}) {
    const url = new URL(`https://api.spotify.com/v1/${endpoint}`);
    Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
    return fetch(url).then(function(response) {
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        return response.json();
    });
};

var artist;
var getArtist = function(name) {


    const query = {
        q: name,
        limit: 1,
        type: 'artist'
    };

    return getFromApi('search', query).then( item => {
                artist = item.artists.items[0];
               let artistId = item.artists.items[0].id;
                console.log(artistId);
                return  artistId;
         }) .then(return fetch('https://api.spotify.com/v1/${artists}/${artistId}/related-artists').then(response =>{
            console.log(response)
         }))
     // return .then( response =>{
    
     //        if (!response.ok) {
     //            return Promise.reject(response.statusText);
     //        }
    
     //        return response.json()

     //        })

        //     .then(getFromApi('search', query).then( item => {
        //         artist = item.artists.items[0].id;
        //         console.log(artist);
        //         return artist;
        // }).catch( err => {
        //     console.log(err);
        // }))

    
}

