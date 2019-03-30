let Request = require("request");
let config = require('../config/Env');

exports.VerifyJwtToken = function (requestVerifyJwtToken, cb) {
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "http://" + config.securityHost + ":" +config.securityPort + "/services/security/verifyJwtToken/",        
        "body": JSON.stringify(requestVerifyJwtToken) 
    }, (error, response, body) => {
        if (error) {
            cb(error, null);
        }else{
            cb(null, JSON.parse(response.body));
        }        
    });
};