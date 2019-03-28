let Request = require("request");

exports.VerifyJwtToken = function (requestVerifyJwtToken, cb) {
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "https://localhost:9443/services/security/verifyJwtToken/",
        "body": JSON.stringify(requestVerifyJwtToken) 
    }, (error, response, body) => {
        if (error) {
            cb(error, null);
        }else{
            cb(null, JSON.parse(response.body));
        }        
    });
};