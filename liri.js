// code to grab the data from keys.js
// then store it as a variable
var twitterKeys = require("./keys.js");

var action = process.argv[2];

if (action === "my-tweets") {
	console.log("MY TWEETS");
} else if (action === "spotify-this-song") {
	console.log("YOU'VE BEEN SPOTIFIED");
} else if (action === "movie-this") {
	console.log("MOVIE HAS BEEN FOUND");
} else if (action === "do-what-it-says") {
	console.log("WHAT AM I DOING?!");
}