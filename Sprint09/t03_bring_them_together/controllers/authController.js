const User = require('../models/user');
const path = require('path');

exports.showLoginPage = (req, res) => {
    if (req.session.user) {
        res.redirect('/main');
    } else {
        res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
    }
};

exports.handleLogin = (req, res) => {
    const { login, password } = req.body;

    User.authenticate(login, password, (err, user) => {
        if (err) return res.status(500).send('Database error.');
        if (!user) return res.status(401).send('Invalid login or password.');

        req.session.user = user;
        res.redirect('/main');
    });
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send('Logout error.');
        res.redirect('/');
    });
};
