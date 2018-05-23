const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'checkoutAPP';
const filename = 'userdata'

// Use connect method to connect to the server
module.exports = {
    insert: (data) => {
        MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");
            const db = client.db(dbName);
          
            insertDocuments(db, data, function() {
                client.close();
            });
        });
    },

    retrieve: (callback) => {
        MongoClient.connect(url, function(err, client) {
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            
            findDocuments(db, function(data) {
                callback(data);
                client.close();
            });
        });

    }
}

const insertDocuments = function(db, data, callback) {
    // Get the collection of the filename
    const collection = db.collection(filename);
    // Insert some documents
    collection.insertOne(data, function(err, result) {
        if (err) {
            console.error(err);
        } else {
            console.log('inserted');
            callback(result);
        }
    });
}

const findDocuments = function(db, callback) {
    // Get the collection of the filename

    const collection = db.collection(filename);

    collection.find().toArray(function(err, result) {
        callback(result);
    });

}