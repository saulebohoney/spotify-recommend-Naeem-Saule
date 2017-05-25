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
        }

    const url = 'https://api.spotify.com/v1/search';
 
          
        return getFromApi('search', query).then( item => {
                artist = item.artists.items[0];
                console.log(artist);
                return artist;
        })

        console.log(artist);
    
}
getArtist('stevie wonder');

