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
    helper.readData(function(data) {
        //use response.send(data);
        response.send(data);
    });
})

app.post('/messages', function(request, response) {
    // request.body passed in must be an JSON.stringified object;
    let data = request.body.message[0];
    data = helper.renderData(JSON.parse(data));
    helper.writeData(data);
    response.send('sent');
})

app.delete('/messages', function(request, response) {
    let data = request.body.filter[0];
    helper.deleteData(data);
    response.send('Deleted');
})


app.listen(app.get('port'), function() {
    console.log('CSV generator listening on Port 8000')
})

