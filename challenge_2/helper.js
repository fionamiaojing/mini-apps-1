const fs = require('fs');
const mongo = require('./mongo/mongo.js');

module.exports = {

    renderData: (message) => {
        console.log(message);
        var template = ['firstName', 'lastName', 'county', 'city', 'role', 'sales']
        var output = [];
        var rowNumber = 0;
        var recursion = (information, parentId) => {
            var currentOutput = [rowNumber];
            for (var key of template) {
                currentOutput.push(information[key] || '');
            }
            currentOutput.push(parentId);
            output.push(currentOutput);
            if ('children' in information && information['children'].length > 0) {
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

    writeData2: () => {
        var example = [
            {
              "firstName": "Smitty",
              "lastName": "Won",
              "county": "San Mateo",
              "city": "Redwood City",
              "role": "Sales Person",
              "sales": 4800000,
              "children": []
            },
            {
              "firstName": "Allen",
              "lastName": "Price",
              "county": "San Mateo",
              "city": "Burlingame",
              "role": "Sales Person",
              "sales": 2500000,
              "children": []
            }
          ]
        mongo.insertToDB(example);
        var result = [];
        mongo.readDB((data) => {
            result.push(data);
            console.log('result ------->', result);
        });
    },

    readData: function(callback) {
        fs.readFile('./CSV-Report/test.txt', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                callback(data.toString());
            }
        })
    },

    deleteData: function(filter) {

        fs.readFile('./CSV-Report/test.txt', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                let newData = data.toString().split('\n').filter(eachLine => !eachLine.includes(filter)).join('\n');
                fs.writeFile('./CSV-Report/test.txt', newData, (err) => {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log('Successly Filtered!')
                    }
                });
            }
        })
    }
}
