const express = require("express");
const helper = require('./helper');
const app = express();

app.use(express.static('public'));

app.set('port', 3000);

app.use(express.json())

//post request

app.post('/account', function (req, res) {
    helper.handlePost(req, res, 'account')
})

app.post('/shipping', function (req, res) {
    helper.handlePost(req, res, 'shipping')
})

app.post('/creditCard', function (req, res) {
    helper.handlePost(req, res, 'creditCard')
})

//get request

app.get('/complete', function(req, res) {
    helper.handleGet(req, res);
})

app.listen(app.get('port'), function () {
    console.log('checkout app listening on port 3000!');
  });
  
