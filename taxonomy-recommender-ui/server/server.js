'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const api_route = require('./routes/recommend');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('dist'));
/* istanbul ignore next */
app.get('/', function (request, response) {
/* istanbul ignore next */
  response.redirect('index.html');
});
/* istanbul ignore next */
const port = process.env.PORT || 3200;
app.listen(port, function () {
  console.log(`Application listening on port ${port}`);
});

app.use('/recommend_taxonomy', api_route);
module.exports = app;
