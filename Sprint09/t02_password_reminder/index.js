const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
const User = require('./models/user');
const config = require('./config.json');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/views', express.static(path.join(__dirname, 'views')));

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
	host: 'smtp.ethereal.email',
	port: 587,
	auth: {
		user: 'andrew.harris@ethereal.email',
		pass: 'fz3BnaZyepz1uHVvKs'
	}
});

// Serve the password reminder form
app.get('/reminder', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'reminder.html'));
});

// Handle password reminder requests
app.post('/reminder', (req, res) => {
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

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) return res.status(500).send('Failed to send email.');
			res.redirect('/views/success.html');
		});
	});
});

app.listen(3000, () => {
	console.log(`Server started on port 3000`);
});
