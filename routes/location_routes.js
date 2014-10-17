var Location = require('../database_models/location_model'),
	secretKey = "test"; //"INSERT_SECRET_HERE";

// Gets all locations provided so far
var getLocationsRoute = {
	method: 'GET',
	path: '/location',
	handler: function(req, reply) {
		reply("GET location works");
	}
}

// Adds a new location
var postLocationRoute = {
	method: 'POST',
	path: '/location',
	handler: function(req, reply) {
		console.log("got location pot message");
		if (req.payload.key && req.payload.key == secretKey) {
			if (req.payload.latitude && req.payload.longitude) {
				new Location({
					timestamp: req.payload.timestamp ? req.payload.timestamp : Date.now(),
					latitude: req.payload.latitude,
					longitude: req.payload.longitude,
					accuracy: req.payload.accuracy ? req.payload.accuracy : -1
				}).save(function(err) {
					if (err) {
					console.log("Database Error:", err);
						reply({ status: 'Database Error', description: "" + err });
					} else {
						reply({ status: 'Success' });
					}
				});
			} else {
				reply({ status: 'Input Error', description: 'Both latitude and longitude are required when posting a location' });
			}
		} else {
			reply({ status: 'Key Error', description: 'Key is missing or invalid' });
		}
	}
}

module.exports.routes = [getLocationsRoute, postLocationRoute]