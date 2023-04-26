var	express = require('express'),
	app	= express();

// Set port using environment variable PORT, otherwise 3000
app.set('port', (process.env.PORT || 3000));

// Set up engine to look for '.ejs' files.
app.set('view engine', 'ejs');

 // Home route
 app.get('/', function(req, res) {	
 	res.send('Hello!');
 });
 
 // Start up server
 app.listen(app.get('port'), function() {
 	console.log('App running on ', app.get('port'));
 });