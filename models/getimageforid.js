let collection =require('../models/connection');
exports.GetImage=function(id){
  return new Promise(function(resolve,reject){
    collection.find({}).toArray().then(data => {
     if (err){
       console.error(err);
     }
      console.log(data)
      resolve(data);
   
    });
  })
 
}
