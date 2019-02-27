require("dotenv").config();
var keys = require("./keys.js");
var omdbApi = require('omdb-client');
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var Title;

var spotify = new Spotify(keys.spotify);
//if process.argv[2] is do-what-it-says
//then run fs.readFile and run the correct command and search that is in random.txt file.
if (process.argv[2] === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        } else {

            Title = data.split(",")[1];

            if (data.split(",")[0] === "spotify-this-song") {
                doSpotify(Title);
            } else if (data.split(",")[0] === "movie-this") {
                searchMovie();
            } else if (data.split(",")[0] === "concert-this") {
                searchConcert();
            }
        }
    });
}
//else if second element in process.argv array is spotify-this-song
//then search up the song name in the 3rd element spot.
else if (process.argv[2] === "spotify-this-song") {
    Title = process.argv.slice(3).join(" ");
    doSpotify(Title);
}
//if the second element in process.argv array is movie-this
//then search up the movie name given in process.argv[3]
//if process.argv[3] is undefined, default to Mr. Nobody
else if (process.argv[2] === "movie-this") {
    Title = process.argv.slice(3).join(" ");
    searchMovie();
}
//if process.argv[2] is concert-this
//then run a call to Bands In Town api
//console.log the venue name, the venue location, and date of event (using moment.js)
else if (process.argv[2] === "concert-this") {
    Title = process.argv.slice(3).join(" ");
    searchConcert();
}

function doSpotify(Title) {
    if (Title === "") {
        spotify.search({
            type: 'track',
            query: "The Sign Ace of Base",
            limit: 1
        }, function (err, data) {
            if (err) {
                console.log(err);
            }
            const query = data.tracks.items[0];
            console.log("Artist: " + query.artists[0].name);
            console.log("Song: " + query.name);
            console.log("Demo: " + query.preview_url);
            console.log("Album: " + query.album.name);


        })
    } else {
        spotify.search({
            type: 'track',
            query: Title,
            limit: 1
        }, function (err, data) {

            if (err) {
                console.log(err);
            }
            const query = data.tracks.items[0];
            console.log("Artist: " + query.artists[0].name);
            console.log("Song: " + query.name);
            console.log("Demo: " + query.preview_url);
            console.log("Album: " + query.album.name);

        })
    }
}

function searchMovie() {
    if (Title === "") {
        var params = {
            apiKey: "35eafc22",
            title: "Mr. Nobody"
        }
        omdbApi.get(params, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log("Title: " + data.Title);
                console.log("Released: " + data.Released);
                console.log(data.Ratings[0].Source + " rating is " + data.Ratings[0].Value);
                console.log(data.Ratings[1].Source + " rating is " + data.Ratings[1].Value);
                console.log("Produced in " + data.Country);
                console.log("Available in " + data.Language);
                console.log("Plot: " + data.Plot);
                console.log("Actors: " + data.Actors);
            }
        });
    } else {
        var params = {
            apiKey: "35eafc22",
            title: Title
        }
        omdbApi.get(params, function (err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log("Title: " + data.Title);
                console.log("Released: " + data.Released);
                console.log(data.Ratings[0].Source + " rating is " + data.Ratings[0].Value);
                console.log(data.Ratings[1].Source + " rating is " + data.Ratings[1].Value);
                console.log("Produced in " + data.Country);
                console.log("Available in " + data.Language);
                console.log("Plot: " + data.Plot);
                console.log("Actors: " + data.Actors);
            }
        });
    }
}

function searchConcert() {
    if (Title === "") {
        Title = "Cardi B"
        axios
            .get("https://rest.bandsintown.com/artists/" + Title + "/events?app_id=codingbootcamp")
            .then(function (response) {
                console.log(Title + " is going on tour to these places: ");
                for (i = 0; i < response.data.length; i++) {
                    console.log("Venue: " + response.data[i].venue.name);
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                    console.log("Event Date: " + moment(response.data[i].datetime).format("LLLL"));
                    console.log("-----------------------------------------------------");
                }
            });
    } else {
        axios
            .get("https://rest.bandsintown.com/artists/" + Title + "/events?app_id=codingbootcamp")
            .then(function (response) {
                console.log(Title + " is going on tour to these places: ");
                for (i = 0; i < response.data.length; i++) {
                    console.log("Venue: " + response.data[i].venue.name);
                    console.log("Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                    console.log("Event Date: " + moment(response.data[i].datetime).format("LLLL"));
                    console.log("-----------------------------------------------------");
                }
            }).catch(function (error) {
                    console.log(error);
                });
            }
    }