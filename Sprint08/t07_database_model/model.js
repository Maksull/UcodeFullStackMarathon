const pool = require('./db');

class Model {
    constructor(attributes) {
        Object.assign(this, attributes);
    }

    static find(id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return resolve(null);
                }
                resolve(new this(results[0]));
            });
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM ${this.constructor.tableName} WHERE id = ?`, [this.id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.affectedRows > 0);
            });
        });
    }

    save() {
        return new Promise((resolve, reject) => {
            if (this.id) {
                // Update existing record
                pool.query(`UPDATE ${this.constructor.tableName} SET ? WHERE id = ?`, [this, this.id], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(results.affectedRows > 0);
                });
            } else {
                // Insert new record
                pool.query(`INSERT INTO ${this.constructor.tableName} SET ?`, this, (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    this.id = results.insertId; // Set the id of the new record
                    resolve(this);
                });
            }
        });
    }
}

module.exports = Model;
