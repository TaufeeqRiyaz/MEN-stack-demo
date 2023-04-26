var express		= require('express'),
	mongoose	= require('mongoose'),
	bodyParser	= require('body-parser'),
	app		= express();
    app.use(express.json());

/********	APP SETUP	********/
// Set port using environment variable PORT, otherwise 3000
app.set('port', (process.env.PORT || 3000));

// Set up engine to look for '.ejs' files.
app.set('view engine', 'ejs');

// Set up app to use body-parser
app.use(bodyParser.urlencoded({ extended:true }));


/********	DB SETUP	********/
// Set up mongoose
mongoose.connect('mongodb+srv://taufeeqriyaz:CW4cTQEfRVldSO3a@cluster0.ckfgn0v.mongodb.net/?retryWrites=true&w=majority');
mongoose.promise = Promise;

// define model
var entrySchema = new mongoose.Schema({
	value: {
		type: String
	}
});
var Entries = mongoose.model('Entries', entrySchema);


/********	ROUTES	********/
// Home route
app.get('/', function(req, res) {
	Entries.find()
	.then( function(entries) {
		res.render('home', {entries: entries});
	})
	.catch( function(err) {
		res.send(err);
	});
});

app.get('/test', (req, res) => {
    const user = [{name: 'Taufeeq', age: 18}, {name: 'Rohit', age: 30}]
  //  res.render('test');
    if(user.length<0){  res.send('No user found');}
  
    else {   res.send(user);}
 
})

app.post('/add-entry', function(req, res) {
	var entry = {
		value: req.body.value
	};

	Entries.create(entry)
	.then( function(entry) {
		res.redirect('/')
	})
	.catch( function(err) {
		res.send(err);
	});
})


// Start up server
app.listen(app.get('port'), function() {
	console.log('App running on ', app.get('port'));
});