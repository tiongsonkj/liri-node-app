// code to grab the data from keys.js
// then store it as a variable
var twitterKeys = require("./keys.js");

var action = process.argv[2];

var twitter = require('twitter');

var client = new twitter({
  consumer_key: '75WTYslruY1x4V6TutRkkvZyf',
  consumer_secret: 'GVoRiXSnumsZbrzOqFm5h3h7MW5nSGGRQzrpqTrbsHlYJr02lF',
  access_token_key: '451296932-ZOjjB8CVliiQk6HpB612VlKQrk0tnpdlBjeeyG74',
  access_token_secret: '4EcYWptj1eWpFZGzDvsEaB6PvM9VpQ1vTS61FBuyvkVA9'
});

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: '2867a68e1a384f449c6427645b390bed',
  secret: '1bba95915dce48468fd1500ad0a148be'
});
 
spotify.search({ type: 'track', query: 'Free Fallin', limit: '1' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
 var artist = data.tracks.items[0].album.artists[0].name;
 var songName = data.tracks.items[0].name;
 var link = data.tracks.items[0].external_urls.spotify;
// console.log(JSON.stringify(data, null, 2));
// console.log(data.tracks);
console.log(data.tracks.items[0].external_urls.spotify);
});

// if (action === "my-tweets") {
// 	var params = {count: '10'};
// 	client.get('statuses/user_timeline', params, function(error, tweets, response) {
// 	  if (error) {
// 	  	console.log(error);
// 	  } else {
// 	  	for (var key in tweets) {
// 		  	console.log("------------------------------");
// 		    console.log('"' + tweets[key].text + '"');
// 		    console.log("Date tweeted: " + tweets[key].created_at);
// 		    console.log("------------------------------");
// 		}	
// 	  }
// 	});
// }
// if (action === "my-tweets") {
// 	console.log("MY TWEETS");
// } else if (action === "spotify-this-song") {
// 	console.log("YOU'VE BEEN SPOTIFIED");
// } else if (action === "movie-this") {
// 	console.log("MOVIE HAS BEEN FOUND");
// } else if (action === "do-what-it-says") {
// 	console.log("WHAT AM I DOING?!");
// }