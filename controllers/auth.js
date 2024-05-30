const mysql2 = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendConfirmationEmail, sendForgotEmail } = require('./mail');

const SECRET_KEY = 'anythinggoes';

// localhost rules, will change once actual server goes up
const db = mysql2.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
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
			return res.render('signup');
		};
		let hashedPass = await bcrypt.hash(password, 8);
		console.log(hashedPass);
		db.query('INSERT INTO user SET ?', {email: email, password: hashedPass, isverified: 0}, (err, result) => {
			if (err) throw err;
			return res.render('signup', {
				message: 'Successfully registered. Check your email to confirm your account.'
			});
		})
	});
	sendConfirmationEmail(email);
	const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // Store token in a cookie
    res.redirect('/'); // Redirect to dashboard or any other route
});

exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM user WHERE email = ?", [email], async (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.render('login', {
                message: "Email not registered"
            });
        }
        const user = result[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.render('login', {
                message: "Incorrect password"
            });
        }
		const token = jwt.sign({ email: email }, SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
		res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // Store token in a cookie
		res.redirect('/log'); // Redirect to dashboard or any other route
    });
};

exports.verifyToken = (req, res, next) => {

    if (!token) {
        return res.status(403).send('Access Denied');
    }

    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            return res.status(403).send('Invalid Token');
        } else {
            console.log(decodedToken);
            next();
        }
    });
};

exports.forgotPassword = (req, res) => {
	console.log("anyone call?");
    const { email } = req.body;
    db.query("SELECT * FROM user WHERE email = ?", [email], async (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.render('signup', {
                message: "Email not found in database"
            });
        } else {
            console.log("Email sent for recovery");
            sendForgotEmail(email);
            return res.render('signup', {
                message: "Recovery email sent"
            });
        }
    });
};

exports.resetPassword = ((req, res) => {
	console.log(req.body);
	const { password, passwordConfirm } = req.body;
	db.query("SELECT password FROM user WHERE password = ?", [password], async (err, result) =>{
		if (err) throw err;
		if (result.length > 0) {
			return res.render('signup', {
				message: "How did I get here?"
			});
		}
		if (password !== passwordConfirm) {
			return res.render('resetp');
		};
		let hashedPass = await bcrypt.hash(password, 8);
		console.log(hashedPass);
		db.query('INSERT INTO user SET ?', {password: hashedPass}, (err, result) => {
			if (err) throw err;
			return res.render('signup', {
				message: 'Successfully reset your password.'
			});
		})
	});
});