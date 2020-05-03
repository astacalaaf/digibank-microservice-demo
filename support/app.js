'use strict';

const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.post('/api/message', function (req, res) {
    res.header("Content-Type", "application/json");
    var payload = {
        message: req.body.message || {},
        user: req.body.user || ""
    };

    console.log(payload);
    sendToSlack(payload.message, payload.user);

    res.status(200).send({'message': 'Message received'});
});

app.get('/health', function (req, res) {
  res.status(200).send({'message': 'Still healthy!'});
});

var request = require ("request");

function sendToSlack (s, user) {
	var payload = {
		text: s
	};
	if (user !== undefined && user !== "") {
		payload.username = user;
	}
	payload.icon_emoji = ":ghost:";

	var slack_request = {
		url: process.env.SLACK_WEBHOOK,
		method: "POST",
		json: payload
	};
	request (slack_request, function (error, response, body) {
		if (!error && (response.statusCode == 200)) {
			console.log ("sendToSlack: " + s);
        } else {
			console.log ("sendToSlack: error, code == " + response.statusCode + ", " + response.body + ".\n");
        }
    });
}

sendToSlack ("Digibank Microservice Demo Application initialised :ghost:");

module.exports = app;
