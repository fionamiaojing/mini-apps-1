const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'test';
const collectionName = 'testing'

// Use connect method to connect to the server
module.exports = {
  insertToDB: (data) => { 
    MongoClient.connect(url, data, function(err, client) {
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      insertData(db, data, function () {
        client.close();
      })
    });
  },

  readDB: (cb) => { 
    MongoClient.connect(url, function(err, client) {
      console.log("Connected successfully to server");
      const db = client.db(dbName);
      findData(db, function (docs) {
        console.log(cb);
        cb(docs);
        client.close();
      })
    });
  },

}

var insertData = function(db, data, callback) {
  const collection = db.collection(collectionName);
  collection.insertMany(data, function(err, result) {
    callback();
  });
}

var findData = function(db, callback) {
  const collection = db.collection(collectionName);
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    callback(docs);
  });
}
