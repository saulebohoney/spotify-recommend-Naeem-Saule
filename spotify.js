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
    const url = 'https://api.spotify.com/v1';
    fetch(url).then(item => {
  
        var artist = item.artists.items[0];
        return artist;
    })
    
};
     getFromApi(search,query);





//     const url = 'https://api.spotify.com/v1/${endpoint}';
//         // Edit me!
// //    ('https://api.spotify.com/v1/search' query, )
//     $.getJSON(url, query).then(stream => {
//             console.log('this',stream);
//             stream.json();
//         });
// };

// getArtist('DREAM');

//$.getJSON(url, query).then