var express = require('express');
var cors = require('cors')
const axios = require('axios');
const { response } = require('express');
const match = require('nodemon/lib/monitor/match');


var app = express();

app.use(cors());
app.listen(4000);
app.use(require('./rutas/rutas.js'))

