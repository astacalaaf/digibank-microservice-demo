'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
const request = require('request');

var app = express();

app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.get('/health', function (req, res) {
  res.status(200).send({'message': 'Still healthy!'});
});

require('./populate.js')(request, dateFormat);

module.exports = app;
