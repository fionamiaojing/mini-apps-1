const express = require('express');
// var bodyParser = require('body-parser')
const helper = require('./helper');

app = express();

app.use(express.static('client'));
app.set('port', process.env.PORT || 8000);

//either use bodyParser or express.json() to parse request.body
// app.use(bodyParser.json());
app.use(express.json());

app.get('/messages', (request, response) => {
    helper.readData(response, helper.sendResponse);
})

app.post('/messages', function(request, response) {
    let data = request.body.message[0];
    data = helper.renderData(JSON.parse(data));
    helper.writeData(data);
    helper.sendResponse(response, 'Sent', 201);
})

app.delete('/messages', function(request, response) {
    let data = request.body.filter[0];
    helper.deleteData(data);
    helper.sendResponse(response, 'Deleted');
})

app.listen(app.get('port'), function() {
    console.log('CSV generator listening on Port 8000')
})

