const mysql2 = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendConfirmationEmail } = require('./mail');

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
			return res.render('signup');
		};
		let hashedPass = await bcrypt.hash(password, 8);
		console.log(hashedPass);
		db.query('INSERT INTO user SET ?', {email: email, password: hashedPass, isverified: 0}, (err, result) => {
			if (err) throw err;
			return res.render('signup', {
				message: 'Successfully registered. Check your email to confirm your account.'
			});
			console.log("user registered");
		})
	});
	sendConfirmationEmail(email);
});

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists in the database
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Server error');
            return;
        }

        if (!results || results.length === 0) {
            // User with this email doesn't exist
            res.status(401).send('Invalid credentials');
            return;
        }

        // Compare the provided password with the hashed password stored in the database
        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            // Passwords don't match
            res.status(401).send('Invalid credentials');
            return;
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    });
}