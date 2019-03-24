//let MongoClient = require('mongodb').MongoClient;
//let url = 'mongodb+srv://MongoDBUser:MongoDBUser@cluster01-wsnjf.mongodb.net/test?retryWrites=true';

let MongoClient = require('mongodb').MongoClient;
let url = "mongodb+srv://MongoDBUser:MongoDBUser@cluster01-wsnjf.mongodb.net/test?retryWrites=true";
let client = new MongoClient(url, { useNewUrlParser: true });


exports.GetCollection = function (collection, cb) {
    console.log("Entra MongoDB");
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("CatalogoDB");
        //var query = { address: "Park Lane 38" };
        dbo.collection(collection).find().toArray(function (err, result) {
            if (err) throw err;
            console.log("REsultado: " + result);
            cb(err, result);
            db.close();
        });
    });



    /*client.connect(err => {
        const collection = client.db("test").collection(collection);
        // perform actions on the collection object
        client.close();
      });*/

    /*
    this.fetchAllCollection = function(cb) {
        this.db.collection(collection, function(error, users) {
          if (error) {
            cb(error, null);
          } else {
            users.find().toArray(function(error, results) {
              cb(error, results);
            });
          }
        });
      };*/

    /*MongoClient.connect(url, function(err, db) {
        var cursor = db.collection('ProductoDetalle').find();
        cursor.each(function(err, item) {
            if (item != null) {
                console.log("item: " + JSON.stringify(item));
            }
        });
        res.send(str);
        db.close();
    });*/
};