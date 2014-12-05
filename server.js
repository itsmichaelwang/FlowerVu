// server.js

// set up
var express = require('express');								// create app with express
var app = express();
var port = process.env.PORT || 5000;

// express modules
var morgan 	= require('morgan');
var bodyParser 	= require('body-parser');
var methodOverride = require('method-override');

// config
app.use(express.static(__dirname + '/public')); 				// set location for files
app.use(morgan('dev'));											// log every request to the console
app.use(bodyParser.json());										// parse application/json
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(methodOverride());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/public/views');

// routes
require('./app/routes.js')(app);

// start app
app.listen(port);
console.log("App listening on port " + port);