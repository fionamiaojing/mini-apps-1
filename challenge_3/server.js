const express = require("express");
const helper = require('./helper');
const app = express();

app.use(express.static('public'));

app.set('port', 3000);

app.use(express.json())

//post request

app.post('/complete', function (req, res) {
    helper.handlePost(req, res)
})

//get request

app.get('/complete', function(req, res) {
    helper.handleGet(req, res);
})

app.listen(app.get('port'), function () {
    console.log('checkout app listening on port 3000!');
});
  
