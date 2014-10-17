var Hapi = require('hapi'),
	Mongoose = require('mongoose'),
	routes = require('./routes/all_routes').routes;

// Variables that need to be configured
var databaseName = 'phone_location_tracker',
	serverPort = 80;

// Setup and connect to the database
Mongoose.connect('mongodb://localhost/' + databaseName);
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("connected to database:", databaseName);
});

// Configure the server
var server = new Hapi.Server(serverPort);

// Setup Handlebars for the server
server.views({
	engines: {
		html: require('handlebars')
	},
	path: './html_templates'
});

// Setup the routes
server.route(routes);

// Redirect request to missing resources to '404.html'
server.ext('onPreResponse', function (request, next) {
	if (typeof(request.response.output) !== 'undefined' && request.response.output.statusCode === 404) {
		next.view('index.html', {});
	} else {
		next();
	}
});

// Start the server
server.start();

console.log("Server started");