const db = require('./db');

class Model {
	constructor(tableName) {
		this.tableName = tableName;
	}

	findAll(callback) {
		const query = `SELECT * FROM ${this.tableName}`;
		db.query(query, (err, results) => {
			if (err) return callback(err);
			callback(null, results);
		});
	}

	findById(id, callback) {
		const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
		db.query(query, [id], (err, results) => {
			if (err) return callback(err);
			callback(null, results[0]);
		});
	}

	// This method can be used for running custom queries
	query(sql, params, callback) {
		db.query(sql, params, callback);
	}
}

module.exports = Model;
