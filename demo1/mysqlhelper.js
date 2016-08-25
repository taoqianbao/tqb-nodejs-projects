// db config
var env = "dev";
var config = require('./database.json')[env];
var password = config.password ? config.password : null;

var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: config.user,
	password: config.password,
	database: config.database,
	port: 3306
});

var query = function(sql, callback) {
	pool.getConnection(function(err, conn) {
		if (err) {
			callback(err, null, null);
		} else {
			conn.query(sql, function(err, rows, fields) {
				conn.release();
				callback(err, rows, fields);
			})
		}
	})
};

module.exports = query;


/*
 * 
 *	//pooling connections
	
	var mysql = require('mysql');
	var pool = mysql.createPool({
		connectionLimit:10,
		host: 'localhost',
		user: 'root',
		password: ''
	});
	
	pool.query('select * from users',function(err,rows,fields){
		if(err) throw err;
		
		res.json(rows);
		
	});
	
	
	
	//https://www.npmjs.com/package/mysql
	var mysql = require('mysql');
	
	var connection = mysql.createConnection({
		host: 'localhost',
		user: config.user,
		password: config.password,
		database: config.database
	});

	connection.connect(function(err) {
		if (err) {
			console.error('error connecting:' + err.stack);
			return;
		}
	});

	connection.query('SELECT * from users', function(err, rows, fields) {
		// connected! (unless `err` is set) 
		if (err) throw err;

		res.json({
			message: rows
		});

	});

	connection.end(function(err){
		//the connection is terminated now
	});
	
	connection.destroy();
	
	
 */
