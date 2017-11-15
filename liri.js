// code to grab the data from keys.js
// then store it as a variable
var twitterKeys = require("./keys.js");

// set the process.argv[2] as a variable
var action = process.argv[2];

var value = process.argv[3];

// require the npm twitter package
var twitter = require('twitter');

// twitter keys
var client = new twitter(twitterKeys);

//require the npm spotify package
var Spotify = require('node-spotify-api');
 
// spotify keys
var spotify = new Spotify({
  id: '2867a68e1a384f449c6427645b390bed',
  secret: '1bba95915dce48468fd1500ad0a148be'
});

// require the npm request package
var request = require('request');

// require the npm request package
var fs = require("fs");

switch (action) {
	case "my-tweets":
		grabTweets();
		break;

	case "spotify-this-song":
		spotifySong();
		break;

	case "movie-this":
		identifyMovie();
		break;

	case "do-what-it-says":
		doWhatItSays();
		break;
}

function grabTweets() {

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
}

function spotifySong() {
	// Take in the command line arguments
	var nodeArgs = process.argv;

	// Create an empty string for holding the song query
	var query = "";

  	// Capture all the words in the address (again ignoring the first two Node arguments)
	for (var i = 3; i < nodeArgs.length; i++) {

		// Build a string with the address.
		query = query + " " + nodeArgs[i];

		// setting query to value which is process.argv[3]
		value = query;
	}
	// if there is no query spotify 'The Sign', else spotify the query search
	if (!value) {
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
		spotify.search({ type: 'track', query: value, limit: '1' }, function(err, data) {
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

function identifyMovie() {
	// Take in the command line arguments
	var nodeArgs = process.argv;

	// Create an empty string for holding the movie search query
	var search = "";

  	// Capture all the words in the address (again ignoring the first two Node arguments)
	for (var i = 3; i < nodeArgs.length; i++) {

		// Build a string with the address.
		search = search + " " + nodeArgs[i];

		// setting search to value which is process.argv[3]
		value = search;

	}

	if (!value) {
		request('http://www.omdbapi.com/?apikey=40e9cece&t=Mr.+Nobody&y=&plot=short&r=json', function (error, response, body) {
			if (error) {
				return console.log("Error occured: " + error);
			} else {

				// grabbing the data and setting them as variables
				var title = JSON.parse(body).Title;
				var releaseDate = JSON.parse(body).Released;
				var imdbRating = JSON.parse(body).imdbRating;
				var rtRating = JSON.parse(body).Ratings[1].Value;
				var country = JSON.parse(body).Country;
				var language = JSON.parse(body).Language;
				var plot = JSON.parse(body).Plot;
				var actors = JSON.parse(body).Actors;

				// console logging everything
				console.log("Movie Title: " + title);
				console.log("Movie Release Date: " + releaseDate);
				console.log("IMDB Rating: " + imdbRating);
				console.log("Rotten Tomatoes Rating: " + rtRating);
				console.log("Country: " + country);
				console.log("Language: " + language);
				console.log("Plot of the movie: " + '"' + plot + '"');
				console.log("Actors: " + actors);
			}
		});
	} else {
		request('http://www.omdbapi.com/?apikey=40e9cece&t='+value+'&y=&plot=short&r=json', function (error, response, body) {
			if (error) {
				return console.log("Error occured: " + error);
			} else {

				// grabbing the data and setting them as variables
				var title = JSON.parse(body).Title;
				var releaseDate = JSON.parse(body).Released;
				var imdbRating = JSON.parse(body).imdbRating;
				var rtRating = JSON.parse(body).Ratings[1].Value;
				var country = JSON.parse(body).Country;
				var language = JSON.parse(body).Language;
				var plot = JSON.parse(body).Plot;
				var actors = JSON.parse(body).Actors;

				//console logging everything
				console.log("Movie Title: " + title);
				console.log("Movie Release Date: " + releaseDate);
				console.log("IMDB Rating: " + imdbRating);
				console.log("Rotten Tomatoes Rating: " + rtRating);
				console.log("Country: " + country);
				console.log("Language: " + language);
				console.log("Plot of the movie: " + '"' + plot + '"');
				console.log("Actors: " + actors);
			}		
		});
	}
}

function doWhatItSays() {
	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			return console.log("Error occured: " + err);
		} else {
			
			// breaks down and splits up the data inside the text.
			data = data.split(",");

			// if the first element in the txt is this specific function,
			// then run that specific function
			if (data[0] === "spotify-this-song") {
				action = "spotify-this-song";
				value = data[1];
				process.argv[3] = value;
				spotifySong();
			} else if (data[0] === "my-tweets") {
				action = "my-tweets";
				grabTweets();
			} else if (data[0] === "movie-this") {
				action = "movie-this";
				value = data[1];
				process.argv[3] = value;
				identifyMovie();
			} else {
				console.log("Sorry I do not recognize this action.");
			}
		}
	});
}