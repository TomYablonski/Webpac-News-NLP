var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
// Require the Aylien npm package
const aylien = require('aylien_textapi');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

console.log(__dirname)

// You could call it aylienapi, or anything else
var textapi = new aylien ({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});


app.get('/test', function (req, res) {
  console.log(mockAPIResponse);
  res.status(200).send(mockAPIResponse);
});


app.post('/article', function (req, res) {
    textapi.sentiment({
        url: req.body.articleUrl,
        mode: 'document',
        }, function(error, response) {
            if(error) {
                return res.status(400).json(error);
            }
        return res.status(200).json(response);
        });
});


// designates what port the app will listen to for incoming requests
app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
})


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

module.exports = app;
