var unirest = require("unirest");

var req = unirest("GET", "https://voicerss-text-to-speech.p.rapidapi.com/");

req.query({
	"r": "0",
	"c": "mp3",
	"f": "8khz_8bit_mono",
	"src": "Hello%2C world!",
	"hl": "en-us"
});

req.headers({
	"x-rapidapi-host": "voicerss-text-to-speech.p.rapidapi.com",
	"x-rapidapi-key": "efc8582206msh34c891ca46002a5p1999dbjsn1f2a79958fa6"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
});