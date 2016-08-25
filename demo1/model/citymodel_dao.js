var citymodel = require('./citymodel').citymodel,
	dbQuery = require('../mysqlhelper.js');

function citymodel_dao() {

	this.retrieve = function(name, callback) {
	
		var strsql = "select sum(answernum) / sum(effectinnum) * 100 as throughrate, sum(qickresponse)/sum(incallnum)*100 as servicelevel, sum(incallnum) as totalincallnum from ccb_monitor_call where province = '" + name + "'";
		
		console.log(strsql);

		var city = new citymodel(name);

		dbQuery(strsql, function(err, rows, fields) {

			if (err) throw err;

			for (var i = 0; i < rows.length; i++) {
				city.throughrate = rows[i]["throughrate"];
				city.servicelevel = rows[i]["servicelevel"];
				city.totalincallnum = rows[i]["totalincallnum"];
			}

			callback(city);


		});

	};
}

exports.dao = citymodel_dao;