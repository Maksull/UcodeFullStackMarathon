const Model = require('../model');
const db = require('../db');

class User extends Model {
	constructor() {
		super('users');
	}

	static createUser({ login, password, full_name, email, status }, callback) {
		const query = 'INSERT INTO users (login, password, full_name, email, status) VALUES (?, ?, ?, ?, ?)';
		db.query(query, [login, password, full_name, email, status], function (err) {
			if (err) return callback(err);
			callback(null);
		});
	}

	static authenticate(login, password, callback) {
		const query = 'SELECT * FROM users WHERE login = ?';
		db.query(query, [login], (err, results) => {
			if (err) return callback(err);
			if (results.length === 0) return callback(null, false);

			const user = results[0];
			if (user.password === password) {
				callback(null, user);
			} else {
				callback(null, false);
			}
		});
	}

	static findByEmail(email, callback) {
		const query = 'SELECT * FROM users WHERE email = ?';
		db.query(query, [email], (err, user) => {
			if (err) return callback(err);
			callback(null, user);
		});
	}
}

module.exports = User;
