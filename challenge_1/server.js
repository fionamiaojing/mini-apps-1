express = require('express');
var app = express();

app.use(express.static('public'));

// app.get('/',function(req,res){ 
//     res.sendFile(__dirname + '/public/index.html');
// });

// app.get('/mystyle.css',function(req,res){ 
//     res.sendFile(__dirname + '/public/mystyle.css');
// });

app.listen(3000, function () {
    console.log('Tic Tac Toe App listening on port 3000!');
});