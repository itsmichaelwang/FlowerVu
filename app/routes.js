// app/routes.js

// in views
module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render('index.html', {
			user : req.user
		});
	});
};