const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const passwordReminderController = require('../controllers/passwordReminderController');
const path = require('path');

// Authentication routes
router.get('/login', authController.showLoginPage);
router.post('/login', authController.handleLogin);
router.get('/logout', authController.logout);

// User registration routes
router.get('/register', userController.showRegistrationPage);
router.post('/register', userController.handleRegistration);

// Password reminder routes
router.get('/reminder', passwordReminderController.showReminderPage);
router.post('/reminder', passwordReminderController.handleReminderRequest);

// Main page
router.get('/', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '..', 'views', 'main.html'));
    } else {
        res.redirect('/login');
    }
});
router.get('/main', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '..', 'views', 'main.html'));
    } else {
        res.redirect('/login');
    }
});

// 404 page
router.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'views', '404.html'));
});

module.exports = router;
