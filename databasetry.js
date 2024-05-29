var mysql = require("mysql2");
var express = require('express');
const app = express();

// Connection
const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '@MniSQL2004',
});

db.connect(function(err) {
	if (err) throw err;
	console.log('MySQL connected');
	db.query("CREATE DATABASE testdb", function(err, result) {
		if (err) throw err;
		console.log("Database created!");
	});
});

app.listen('8080', () => {
	console.log("Connected");
});
