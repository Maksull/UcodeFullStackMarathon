const nodemailer = require('nodemailer');
const User = require('../models/user');
const path = require('path');
const config = require('../config.json');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'aaron.lynch2@ethereal.email',
        pass: 'pX5x1GeMpPgZz6a1Ca'
    }
});

exports.showReminderPage = (req, res) => {
    if (req.session.user) {
        res.redirect('/main');
    } else {
        res.sendFile(path.join(__dirname, '..', 'views', 'reminder.html'));
    }
};

exports.handleReminderRequest = (req, res) => {
    const { email } = req.body;

    User.findByEmail(email, (err, user) => {
        if (err) return res.status(500).send('Database error.');
        if (!user) return res.status(404).send('User not found.');

        const mailOptions = {
            from: config.user,
            to: email,
            subject: 'Password Reminder',
            text: `Your password is: ${user.password}`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) return res.status(500).send('Failed to send email.');
            res.sendFile(path.join(__dirname, '..', 'views', 'success.html'));
        });
    });
};
