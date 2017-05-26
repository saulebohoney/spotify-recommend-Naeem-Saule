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
        type: 'artist',
        country: 'US'
    };

    return getFromApi('search', query)
        .then( item => {
                artist = item.artists.items[0];
              
               let artistId = item.artists.items[0].id;
               
                return  getFromApi(`artists/${artistId}/related-artists`)
         })
        .then( item =>{
            
            console.log('before', artist)
            
            artist.related = item.artists;
            
             console.log('that', artist)
            
            let topTracksPromises = item.artists.map(artist => {
              
               return getFromApi(`artists/${artist.id}/top-tracks`, query)  //returns a promise

            })
            return  Promise.all(topTracksPromises) //when all are complete make the object
                .then( data => {

                console.log(data);
                   
                console.log(artist);

                data.forEach( (obj, i) => artist.related[i].tracks = obj.tracks)

                console.log(artist)
                  
                return artist
            })
                   
         })
   
       
}

