const normal = require('./normal-router');
const quantum = require('./quantum-router');
const express = require("express");

const time = normal.calculateTime();
const quantumTime = quantum.calculateTime();

const app = express();
app.set("view engine", "ejs");

const renderTemplate = (template, response) => {
    response.render(template, {
        yearn: time.years(),
        monthn: time.months(),
        dayn: time.days(),
        yearq: quantumTime[0],
        monthq: quantumTime[1],
        dayq: quantumTime[2],
    });
};

app.use("/quantum", (request, response) => renderTemplate('quantum', response));
app.use("/normal", (request, response) => renderTemplate('normal', response));
app.use("/", (request, response) => renderTemplate('index', response));

app.listen(3000);
