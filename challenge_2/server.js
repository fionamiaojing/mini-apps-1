const express = require('express');
// var bodyParser = require('body-parser')
const helper = require('./helper');

app = express();

app.use(express.static('client'));
app.set('port', process.env.PORT || 8000);

//either use bodyParser or express.json() to parse request.body
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

app.get('/messages', (request, response) => {
    helper.readData(function(data) {
        //use response.send(data);
        response.send(data);
    });
})

app.post('/messages', function(request, response) {
    //the request body is an object;
    data = helper.renderData(request.body);
    helper.writeData(data);
    //mongodb
    helper.writeData2();
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

