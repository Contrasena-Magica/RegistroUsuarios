const mysql2 = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'jorday.02@gmail.com',
		pass: 'onavas.2011'
	}
});


// localhost rules, will change once actual server goes up
const db = mysql2.createConnection({
	host: 'localhost',
	user: 'root',
	password: '@MniSQL2004',
	database: 'users'
});

exports.signup = ((req, res) => {
	console.log(req.body);
	const { name, email, password, passwordConfirm } = req.body;
	db.query("SELECT email FROM user WHERE email = ?", [email], async (err, result) =>{
		if (err) throw err;
		if (result.length > 0) {
			return res.render('signup', {
				message: "Email already exists"
			});
		}
		if (password !== passwordConfirm) {
			return res.render('signup', {
				message: "Passwords do not match"
			});
		};
		let hashedPass = await bcrypt.hash(password, 8);
		console.log(hashedPass);
		db.query('INSERT INTO user SET ?', {email: email, password: hashedPass }, (err, result) => {
			if (err) throw err;
			return res.render('signup', {
				message: 'Successfully registered'
			});
			console.log("user registered");
		})
	});
	var mailOptions = {
	from: 'jorday.02@gmail.com',
	to: req.body.email,
	subject: 'Confirm email!',
	text: 'Figure it out'
	};
	transporter.sendMail(mailOptions, function(err, info) {
		if (err) throw err;
		else console.log('Email sent: ' + info.response);
	});
});
