const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'root', // Replace with your MySQL password
    database: 'node_login_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ' + err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/form.html');
});

app.post('/submit', (req, res) => {
    const { name, email, contact, date } = req.body;
    
    // Insert into MySQL database
    const sql = 'INSERT INTO users (name, email, contact, date) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, contact, date], (err, result) => {
        if (err) {
            console.error('Error inserting into database: ' + err.stack);
            res.status(500).send('Error submitting form');
            return;
        }
        console.log('1 record inserted');
        res.send('Form submitted successfully!');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
