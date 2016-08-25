var express = require('express');
var app = express();

app.get('/',function(req,res){
	res.send('hello world');
});

app.post('/',function(req,res){
	res.send('post request to the homepage');
});



