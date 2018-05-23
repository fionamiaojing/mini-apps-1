const fs = require('fs');

module.exports = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'content-type',
        'Content-Type': 'application/json'
    },

    sendResponse: function(res, data, statusCode) {
        statusCode = statusCode || 200;
        res.writeHead(statusCode, exports.headers);
        res.end(data);
    },

    renderData: (message) => {
        var template = ['firstName', 'lastName', 'county', 'city', 'role', 'sales']
        var output = [];
        var rowNumber = 0;
        var recursion = (information, parentId) => {
            var currentOutput = [rowNumber];
            for (var key of template) {
                currentOutput.push(information[key]);
            }
            currentOutput.push(parentId);
            output.push(currentOutput);
            if (information['children'].length > 0) {
                parentId = rowNumber;
                for (var child of information['children']) {
                    rowNumber++;
                    recursion(child, parentId);
                }
            }
        };

        recursion(message, 'NA');
        return output;
    },

    writeData: function(arrayOfData) {
        var dataToFile = 'firstName,lastName,county,city,role,sales,parentID' + '\n'
        dataToFile += arrayOfData.map((nestedArray) => nestedArray.join(',')).join('\n')
        fs.writeFile('./CSV-Report/test.txt', dataToFile, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Successly Saved!')
            }
        });
    },

    readData: function(res, callback) {
        fs.readFile('./CSV-Report/test.txt', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                console.log(data.toString());
                callback(res, data.toString());
            }
        })
    },

    deleteData: function(filter) {
        
    }
}
