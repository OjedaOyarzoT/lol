var express = require('express');
var cors = require('cors')
const axios = require('axios');
const { response } = require('express');
const config = require('./config.js');

var app = express();
app.use(cors());
app.listen(4000);

const APIKEY = config.API_KEY ;

