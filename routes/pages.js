const express = require('express');
const router = express.Router();
const app = express();
const mysql2 = require('mysql2');
const csvtojson = require('csvtojson');
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'users'
});

const db2 = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'movies'
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

router.get('/logout', (req, res) => {
    res.render('logout');
});

router.get('/resetp', (req, res) => {
    res.render('resetp');
});

const fileName = "netflix_titles.csv";

db2.connect( (err) => {
	if (err) throw err;
	console.log("DB2 connected");
});

function generateChartData(callback) {

    for (var i = 0; i < 7; i++) {
        var randomnumber = Math.floor(Math.random() * (10 - 1) + 1);
        console.log(randomnumber);
        db.query("INSERT INTO cat SET ?", {country: randomnumber}, function(err, result) {
            if (err) throw err;
            console.log("star added)")
        });

    }
    db.query('SELECT * FROM CAT LIMIT 7', (err, rows) => {
        if (err) throw err;    
        const labels = [];
        const values = [];
        
        rows.forEach(row => {
            labels.push(row.title); 
            values.push(row.rating); 
        });
        
        callback(null, { labels, values });
    });
}

generateChartData((err, data) => {
    if (err) {
        console.error('Error generating chart data:', err);
    } else {
        console.log('Chart data:', data);
    }
});


// using quickchart to display graph data
router.get('/chart', (req, res) => {
    generateChartData((err, chartData) => {
        if (err) {
            console.error('Error generating chart data:', err);
            res.status(500).send('Error generating chart data');
        } else {
            const chartUrl = `https://quickchart.io/chart?c=${encodeURIComponent(JSON.stringify({
                type: 'horizontalBar',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: 'Data from Database',
                        data: chartData.values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }))}`;

            res.redirect(chartUrl);
        }
    });
});



app.get('/logout', (req, res) => {
    res.clearCookie('jwt'); 
    res.redirect('/logout'); 
});

router.get('/dashboard', (req, res) => {
	const randomData = {
        labels: Array.from({ length: 10 }, (_, i) => `Label ${i + 1}`),
        values: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
    };
    res.render('dashboard', { graphData: randomData });
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

router.get('/forgot', (req, res) => {
    const { token } = req.query;

    db.query('SELECT * FROM email_tokens WHERE token = ?', [token], (err, results) => {
        if (err) {
            return res.render('forgot', { message: 'Server error' });
        }

        if (results.length === 0) {
            return res.render('forgot', { message: 'Invalid or expired token' });
        }

        const tokenData = results[0];
        const now = new Date();

        if (now > new Date(tokenData.expires_at)) {
            return res.render('forgot', { message: 'Token has expired' });
        }
    });
});



module.exports = router;
