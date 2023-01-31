const express = require('express');
const app = express();

const fs = require('fs');

const fileNameForJSON = './exoplanets.json';
app.use(express.json());
const path = require('path');
app.use(express.static(path.join(__dirname, 'client')));

const exoplanets = require(fileNameForJSON);

app.get('/exoplanet/:exoplanet', function (req, resp) {
    const exoplanet = req.params.exoplanet;
    const information = exoplanets[exoplanet];
    resp.send(information);
});

app.get('/exoplanets', function (req, resp) {
    const exoplanetNames = Object.keys(exoplanets);
    resp.send(exoplanetNames);
});

app.post('/exoplanet/new', function (req, resp) {
    const name = req.body.name;
    const category = req.body.category;
    const distance = req.body.distance;
    const desc = req.body.desc;
    exoplanets[name] = {"category":"","distance":"","desc":""};
    exoplanets[name].category = category;
    exoplanets[name].distance = distance;
    exoplanets[name].desc = desc;
    fs.writeFileSync(fileNameForJSON, JSON.stringify(exoplanets));
    resp.send(exoplanets);
});

module.exports = app;