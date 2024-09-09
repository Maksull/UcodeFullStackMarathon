const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/user');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/register', (req, res) => {
	const { login, password, confirm_password, full_name, email } = req.body;

	if (password !== confirm_password) {
		return res.status(400).send('Passwords do not match.');
	}

	User.isLoginUnique(login, (err, loginUnique) => {
		if (err) return res.status(500).send('Database error.');
		if (!loginUnique) return res.status(400).send('Login is already taken.');

		User.isEmailUnique(email, (err, emailUnique) => {
			if (err) return res.status(500).send('Database error.');
			if (!emailUnique) return res.status(400).send('Email is already registered.');

			User.createUser({ login, password, full_name, email }, (err) => {
				if (err) return res.status(500).send('Failed to register user.');
				res.status(200).send('User registered successfully!');
			});
		});
	});
});

app.listen(3000, () => {
	console.log('Server started on port 3000');
});
