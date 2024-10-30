
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'research'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});


app.post('/api/register', (req, res) => {
    const { email, password, name, role, researchInterest } = req.body;

    const query = 'INSERT INTO users (email, password, name, role, research_interest) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [email, password, name, role, researchInterest], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Registration failed' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});


app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email, passwod)

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const user = results[0];
        
    
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

     
        res.status(200).json({ message: 'Login successful', user });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
