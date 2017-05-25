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
        return  fetch('https://api.spotify.com/v1/artist/${artistId}/related-artists');
    }).then((item)=> {
             return item.json();
             console.log(item);
         });
};
        

var getArtist = function(name) {


    const query = {
        q: name,
        limit: 1,
        type: 'artist'
    };

    //const url = 'https://api.spotify.com/v1/search';
 
          
        return getFromApi('search', query).then( item => {
                artist = item.artists.items[0];
                const artistId = item.artists.items[0].id;
                console.log(artist);
                return getFromApi(`artists/${artistId}/related-artists`);
        }).then( item => {
            artist.related =item.artists;
                console.log(item);
                return artist;
                
        }).catch(function(err) {
            console.log(err);
        });

        //console.log(artist);
    
}
//getArtist('stevie wonder');

