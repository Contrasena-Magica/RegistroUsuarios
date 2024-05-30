const express = require('express');
const app = express();
const mysql2 = require("mysql2");
const path = require("path");


const publicDirectory = path.join(__dirname, './public');
app.set('view engine', 'ejs');

app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql2.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'users'
});

db.connect( (err) => {
	if (err) throw err;
	/*var sql = "CREATE DATABASE IF NOT EXISTS movies";
	db.query(sql, function(err, result) {
		if (err) throw err;
		console.log("Database created");
	});
	var sql2 = "CREATE TABLE IF NOT EXISTS movie (title VARCHAR(255), country VARCHAR(255), duration VARCHAR(255))";
	db.query(sql2, function (err, result) {
		if (err) throw err;
		console.log("Table created");
	})
	*/
	console.log("DB connected");
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.listen(8080, () => {
	console.log("I'm running!");
})

const userRouter = require('./routes/users');
app.use('/users', userRouter);
