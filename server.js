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
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.get('/logout', (req, res) => {
    res.clearCookie('jwt'); 
    res.redirect('/login'); 
});

app.listen(8080, () => {
	console.log("I'm running!");
})

const userRouter = require('./routes/users');
app.use('/users', userRouter);
