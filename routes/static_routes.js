// Serve all files in the 'public' folder as static resources.
// Used to provide css, js, and image files.
var staticRoute = {
	method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
        	path: 'public',
        	listing: false,
        	index: true
        }
    }
};

// Serve the default route
var defaultRoute = {
	method: 'GET',
	path: '/',
	handler: function(req, reply) {
		reply.view('index.html', {});
	}
}

module.exports.routes = [staticRoute, defaultRoute]