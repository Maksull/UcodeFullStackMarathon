const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Serve login form or dashboard
app.get('/', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
    } else {
        res.sendFile(path.join(__dirname, 'public', 'login.html'));
    }
});

// Handle login
app.post('/login', (req, res) => {
    const { login, password } = req.body;

    User.authenticate(login, password, (err, user) => {
        if (err) return res.status(500).send('Database error.');
        if (!user) return res.status(401).send('Invalid login or password.');

        req.session.user = user;
        res.redirect('/');
    });
});

// Handle logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Logout error.');
        res.redirect('/');
    });
});

// API Endpoint to fetch user status
app.get('/api/user-status', (req, res) => {
    if (req.session.user) {
        res.json({ status: req.session.user.status });
    } else {
        res.status(401).json({ status: 'not logged in' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
