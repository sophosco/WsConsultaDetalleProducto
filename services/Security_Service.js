let Request = require("request");
let config = require('../config/Env');

exports.VerifyJwtToken = function (requestVerifyJwtToken, cb) {
    console.log("Configuracion: " + config.securityHost + " " + config.securityPort);    
    Request.post({
        "headers": { "Content-Type": "application/json" },
        "url": "http://" + config.securityHost + ":" +config.securityPort + "/services/security/verifyJwtToken/",        
        "body": JSON.stringify(requestVerifyJwtToken) 
    }, (error, response, body) => {
        if (error) {
            console.log("error: " + error); 
            cb(error, null);
        }else{
            console.log("response.body: " + response.body);  
            cb(null, JSON.parse(response.body));
        }        
    });
};