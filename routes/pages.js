const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@MniSQL2004',
    database: 'users'
});

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/log', (req, res) => {
    res.render('log');
});

router.get('/confirm', (req, res) => {
    const { token } = req.query;

    db.query('SELECT * FROM email_tokens WHERE token = ?', [token], (err, results) => {
        if (err) {
            return res.render('confirm', { message: 'Server error' });
        }

        if (results.length === 0) {
            return res.render('confirm', { message: 'Invalid or expired token' });
        }

        const tokenData = results[0];
        const now = new Date();

        if (now > new Date(tokenData.expires_at)) {
            return res.render('confirm', { message: 'Token has expired' });
        }

        db.query('UPDATE user SET isverified = 1 WHERE email = ?', [tokenData.email], (err, result) => {
            if (err) {
                return res.render('confirm', { message: 'Server error' });
            }

            db.query('DELETE FROM email_tokens WHERE token = ?', [token], (err, result) => {
                if (err) {
                    return res.render('confirm', { message: 'Server error' });
                }

                res.render('confirm', { message: 'Email successfully confirmed' });
            });
        });
    });
});


module.exports = router;
