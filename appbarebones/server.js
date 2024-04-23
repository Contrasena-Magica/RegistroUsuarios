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
	password: '@MniSQL2004',
	database: 'users'
});

db.connect( (err) => {
	if (err) throw err;
	console.log("DB connected");
	/* ALREADY GENERATED USER TABLE
	var sql = "CREATE TABLE user (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(100), password VARCHAR(255))";
	db.query(sql, function(err) {
		if (err) throw err;
		console.log("Table successfully created");
	*/
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(8080, () => {
	console.log("I'm running!");
})

const userRouter = require('./routes/users');
app.use('/users', userRouter);
