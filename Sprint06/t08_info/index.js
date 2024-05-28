const express = require('express');
const path = require('path');
const ip = require('ip');
const os = require('os');

const app = express();

app.get('/', (req, res) => {
    console.log(`1: ${path.basename(__filename)}`);
    console.log(`2: ${process.argv.slice(2)}`);
    console.log(`3: ${ip.address()}`);
    console.log(`4: ${os.hostname()}`);
    console.log(`5: ${req.protocol}`);
    console.log(`6: ${req.method}`);
    console.log(`7: ${req.get('user-agent')}`);
    console.log(`8: ${ip.address()}`);
    console.log(`9: ${req.url.slice(1)}`);
});

app.listen(3000);