static_routes = require('./static_routes').routes;
location_routes = require('./location_routes').routes;

module.exports.routes = static_routes.concat(location_routes);