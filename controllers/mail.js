const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mysql2 = require('mysql2');
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@MniSQL2004',
    database: 'users'
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jorday.02@gmail.com',
        pass: 'wfdg xsib ghii sfhw'
    }
});

const generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

// Helper function to format the timestamp for MySQL
const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JS
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};

exports.sendConfirmationEmail = (email) => {
    const token = generateToken();
    const expirationTime = Date.now() + 3600000; // Token expires in 1 hour
    const formattedExpirationTime = formatDate(expirationTime);

    const mailOptions = {
        from: 'jorday.02@gmail.com',
        to: email,
        subject: 'Confirm email!',
        text: `Please click on the following link to confirm your email: http://localhost:8080/confirm?token=${token}`
    };

    db.query('INSERT INTO email_tokens (email, token, expires_at) VALUES (?, ?, ?)', [email, token, formattedExpirationTime], (err, result) => {
        if (err) throw err;
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                throw err;
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });

    return token;
};

exports.sendForgotEmail = (email) => {
    const token = generateToken();
    const expirationTime = Date.now() + 3600000; // Token expires in 1 hour
    const formattedExpirationTime = formatDate(expirationTime);

    const mailOptions = {
        from: 'jorday.02@gmail.com',
        to: email,
        subject: 'Reset your password!',
        text: `Please click on the following link to reset your email: http://localhost:8080/forgot?token=${token}`
    };

    db.query('INSERT INTO email_tokens (email, token, expires_at) VALUES (?, ?, ?)', [email, token, formattedExpirationTime], (err, result) => {
        if (err) throw err;
        transporter.sendMail(mailOptions, function(err, info) {
            if (err) {
                throw err;
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });

    return token;
};