// BASE SETUP
// =============================================================================

var express = require('express'),
	bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

var env = app.get('env') == 'development' ? 'dev' : app.get('env');
var port = process.env.PORT || 8081;

var dbQuery = require('./mysqlhelper.js');
var Dao = require('./model/citymodel_dao.js').dao;

// IMPORT MODELS
// =============================================================================
var Sequelize = require('sequelize');

// db config
var env = "dev";
var config = require('./database.json')[env];
var password = config.password ? config.password : null;

// initialize database connection
var sequelize = new Sequelize(
	config.database,
	config.user,
	config.password, {
		dialect: config.driver,
		logging: console.log,
		define: {
			timestamps: false
		}
	}
);


var crypto = require('crypto');
var DataTypes = require("sequelize");

// IMPORT ROUTES
// =============================================================================
var router = express.Router();

router.route('/reports')

// get a user by id(accessed at GET http://localhost:8081/api/reports/)
.get(function(req, res) {

	var dao = new Dao();

	dao.retrieve('上海', function(model) {

		res.json(model);

	});

});

//自定义报表查询接口
router.route('/reports/:city_name')

// get a user by id(accessed at GET http://localhost:8081/api/reports/:city_name)
.get(function(req, res) {

	var city = req.params.city_name;
	
	var dao = new Dao();

	dao.retrieve(city, function(model) {

		res.json(model);

	});
	

});

// Middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// REGISTER OUR ROUTES
// =============================================================================
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);

console.log('Magic happens on port ' + port);