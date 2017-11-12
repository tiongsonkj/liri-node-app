// code to grab the data from keys.js
// then store it as a variable
var twitterKeys = require("./keys.js");

// set the process.argv[2] as a variable
var action = process.argv[2];

// require the npm twitter package
var twitter = require('twitter');

var client = new twitter({
  consumer_key: '75WTYslruY1x4V6TutRkkvZyf',
  consumer_secret: 'GVoRiXSnumsZbrzOqFm5h3h7MW5nSGGRQzrpqTrbsHlYJr02lF',
  access_token_key: '451296932-ZOjjB8CVliiQk6HpB612VlKQrk0tnpdlBjeeyG74',
  access_token_secret: '4EcYWptj1eWpFZGzDvsEaB6PvM9VpQ1vTS61FBuyvkVA9'
});

//require the npm spotify package
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: '2867a68e1a384f449c6427645b390bed',
  secret: '1bba95915dce48468fd1500ad0a148be'
});

// if action is equal to...
if (action === "my-tweets") {

	// last 10 tweets
	var params = {count: '10'};

	// get the tweets
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (error) {
	  	console.log(error);
	  } else {
	  	for (var key in tweets) {
		  	console.log("------------------------------");
		    console.log('"' + tweets[key].text + '"');
		    console.log("Date tweeted: " + tweets[key].created_at);
		    console.log("------------------------------");
		}	
	  }
	});
} else if (action === "spotify-this-song") {
	
	// Take in the command line arguments
	var nodeArgs = process.argv;

	// Create an empty string for holding the song query
	var query = "";

  	// Capture all the words in the address (again ignoring the first two Node arguments)
	for (var i = 3; i < nodeArgs.length; i++) {

	// Build a string with the address.
	query = query + " " + nodeArgs[i];

	}

	// if there is no query spotify 'The Sign', else spotify the query search
	if (!query) {
		spotify.search({ type: 'track', query: 'The Sign', limit: '1' }, function(err, data) {
			if (err) {
		    	return console.log('Error occurred: ' + err);
		  	} else {
		 		
		 		// setting the data grabbed as elements
				var artist = data.tracks.items[0].album.artists[0].name;
			 	var songName = data.tracks.items[0].name;
			 	var link = data.tracks.items[0].external_urls.spotify;
			 	var albumName = data.tracks.items[0].album.name;

			 	console.log("Artist Name: " + artist);
			 	console.log("Song Name: " + songName);
			 	console.log("Spotify Link: " + link);
			 	console.log("Album Name: " + albumName);
		 	}
		});
	} else {
		spotify.search({ type: 'track', query: query, limit: '1' }, function(err, data) {
			if (err) {
		    	return console.log('Error occurred: ' + err);
		  	}
		 
		 	// setting the data grabbed as elements
			var artist = data.tracks.items[0].album.artists[0].name;
		 	var songName = data.tracks.items[0].name;
		 	var link = data.tracks.items[0].external_urls.spotify;
		 	var albumName = data.tracks.items[0].album.name;

			console.log("Artist Name: " + artist);
			console.log("Song Name: " + songName);
			console.log("Spotify Link: " + link);
			console.log("Album Name: " + albumName);
		});
	}
}
// if (action === "my-tweets") {
// 	console.log("MY TWEETS");
// } else if (action === "spotify-this-song") {
// 	console.log("YOU'VE BEEN SPOTIFIED");
// } else if (action === "movie-this") {
// 	console.log("MOVIE HAS BEEN FOUND");
// } else if (action === "do-what-it-says") {
// 	console.log("WHAT AM I DOING?!");
// }