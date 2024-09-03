const pool = require('./db');

// Example query
pool.query('SELECT * FROM heroes', (err, results) => {
  if (err) {
    return console.error('Error executing query:', err);
  }
  console.log('Heroes:', results);
});

// Close the pool when done
pool.end(err => {
  if (err) {
    return console.error('Error closing the pool:', err);
  }
  console.log('Connection pool closed.');
});
