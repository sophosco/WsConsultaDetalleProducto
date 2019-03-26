/* eslint-disable no-console */
/* eslint-disable callback-return */

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://MongoDBUser:MongoDBUser@cluster01-wsnjf.mongodb.net/test?retryWrites=true";
let client = new MongoClient(url, { useNewUrlParser: true });


exports.GetCollection = function (collection, cb) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("CatalogoDB");
    dbo.collection(collection).find().toArray(function (err, result) {
      if (err) throw err;     
      cb(err, result);
      db.close();
    });
  });
};