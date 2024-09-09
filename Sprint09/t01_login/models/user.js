const Model = require('../model');

class User extends Model {
    constructor() {
        super('users');  // Pass the table name to the parent class
    }

    createUser(user, callback) {
        const query = 'INSERT INTO users (login, password, full_name, email, status) VALUES (?, ?, ?, ?, ?)';
        this.query(query, [user.login, user.password, user.full_name, user.email, user.status], callback);
    }

    authenticate(login, password, callback) {
        const query = 'SELECT * FROM users WHERE login = ?';
        this.query(query, [login], (err, results) => {
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
}

module.exports = new User();
