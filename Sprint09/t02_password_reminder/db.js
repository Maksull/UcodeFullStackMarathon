const mysql = require('mysql2');
const config = require('./config.json');

const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

module.exports = connection;
