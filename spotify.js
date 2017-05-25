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

    return getFromApi('search', query).then( item => {
<<<<<<< HEAD
                artist = item.artists.items[0];
               let artistId = item.artists.items[0].id;
                console.log(artistId);
                console.log(artist);
                return  getFromApi(`artists/${artistId}/related-artists`)
         }).then( item =>{
            artist.related = item.artists;
            let topTracksPromises = item.artists.map(artist => {
                //console.log(artist.id);
               return getFromApi(`artists/${artist.id}/top-tracks`, query)

            })
          return  Promise.all(topTracksPromises)
                .then( data => {

                    console.log(data);
                    console.log(artist);

                    data.forEach( (obj, i) => artist.related[i].tracks = obj.tracks)

                    console.log(artist)
                    //return data.track
                    return artist
                })
                // console.log(topTracksPromises);
                
                //return artist
         }
         )
     // return .then( response =>{
    
     //        if (!response.ok) {
     //            return Promise.reject(response.statusText);
     //        }
    
     //        return response.json()


