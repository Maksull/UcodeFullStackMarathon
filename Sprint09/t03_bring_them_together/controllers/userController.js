const User = require('../models/user');
const path = require('path');

exports.showRegistrationPage = (req, res) => {
    if (req.session.user) {
        res.redirect('/main');
    } else {
        res.sendFile(path.join(__dirname, '..', 'views', 'registration.html'));
    }
};

exports.handleRegistration = (req, res) => {
    const { login, password, confirmPassword, full_name, email } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match.');
    }

    User.createUser({ login, password, full_name, email, status: 'user' }, (err) => {
        if (err) return res.status(500).send('Database error.');
        res.redirect('/login');
    });
};
