/* eslint-disable no-console */
/* eslint-disable callback-return */

let mongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://MongoDBUser:MongoDBUser@cluster01-wsnjf.mongodb.net/test?retryWrites=true";
let client = new mongoClient(url, { useNewUrlParser: true });


exports.GetCollection = function (collection, cb) {
  mongoClient.connect(url, function (err, db) {
    if (err) cb(err, null);  
    var dbo = db.db("CatalogoDB");
    dbo.collection(collection).find().toArray(function (err, result) {
      if (err) cb(err, null);     
      cb(err, result);
      db.close();
    });
  });
};

exports.GetCollectionFilter = function (collection, filter, cb) {
  mongoClient.connect(url, function (err, db) {
    if (err) cb(err, null);   
    var dbo = db.db("CatalogoDB");
    dbo.collection(collection).find(filter).toArray(function (err, result) {
      if (err) cb(err, null);     
      cb(err, result);
      db.close();
    });
  });
};