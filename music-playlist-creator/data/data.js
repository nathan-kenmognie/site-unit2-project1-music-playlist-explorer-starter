const jsonFetch = fetch('./data/data.json').then(response => response.json());  

jsonFetch.then(jsonData => {jsonFunction(jsonData)});


let jsonFunction = (jsonData) => {

    for (let i = 0; i<jsonData.playlists.length;i++){
            console.log(jsonData.playlists[i]);
            let playlistID = jsonData.playlists[i].playlistID;

            console.log("PlaylistID: "+ playlistID)

    }



}