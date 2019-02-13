require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var songTitle;

var spotify = new Spotify(keys.spotify);
//The's comment
            // if processargv3 === undefined
            //     then set songTitle/query to fs.read... dataArr[1]
            // Else set songTitle/query to processargv3

            // spotify.search... {
            // query: songTitle
            // }
            // }

//My comment
            //if process.argv[2] is do-what-it-says
            //then run fs.readFile and search up the song in random.txt file.
if (process.argv[2] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        } else {
           
            songTitle = fs.readFile;
            var dataArr = data.split(",");
            spotify.search({
                type: 'track',
                query: songTitle,
                limit: 1
            })
            console.log(data);
        }

    })
}
//else if second element in process.argv array is spotify-this-song
//then search up the song name in the 3rd element spot.
else if(process.argv[2] === "spotify-this-song") {
    songTitle = process.argv.slice(3).join(" ");
    spotify.search({
        type: 'track',
        query: songTitle,
        limit: 1
    }, function (err, data) {

        if (err) {
            console.log(err);
        } 
            console.log(data.tracks.items[0]);
        
    })
}
//if the second element in process.argv array is movie-this
//then search up the movie name given in process.argv[3]
//if process.argv[3] is undefined, default to Mr. Nobody
else if(process.argv[2] === "movie-this") {
    var omdbApi = require('omdb-client');
 
var params = {
    apiKey: '35eafc22',
    title: 'Terminator',
    year: 2012
}
omdbApi.get(params, function(err, data) {
    if (err) {
        console.log(err);
    }
    else {
    console.log(data);
    }
    // process response...
});
}
//if process.argv[2] is concert-this
//then run a call to Bands In Town api
//console.log the venue name, the venue location, and date of event (using moment.js)
else if (process.argv[2] === "concert-this") {
    var bit_js = require('bit_js');


var options = {
  'artist': 'skrillex',
  'app_id': 'codingbootcamp',
};

var optionsEvents = {
  'artist': 'skrillex',
  'app_id': 'codingbootcamp',
  'daterange': '2017-09-20',
}

var callback = function(data) {
  console.log(data)
}


bit_js.bitGetArtist(options, callback);
bit_js.bitGetArtistEvents(optionsEvents, callback);
}