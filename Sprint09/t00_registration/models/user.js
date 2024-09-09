const Model = require('../model');

class User extends Model {
    constructor() {
        super('users');  // Pass the table name to the parent class
    }

    createUser(user, callback) {
        const query = 'INSERT INTO users (login, password, full_name, email) VALUES (?, ?, ?, ?)';
        this.query(query, [user.login, user.password, user.full_name, user.email], callback);
    }

    isLoginUnique(login, callback) {
        const query = 'SELECT COUNT(*) AS count FROM users WHERE login = ?';
        this.query(query, [login], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0].count === 0);
        });
    }

    isEmailUnique(email, callback) {
        const query = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
        this.query(query, [email], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0].count === 0);
        });
    }
}

module.exports = new User();
