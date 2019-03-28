let Request = require("request");

exports.VerifyJwtToken = function (requestVerifyJwtToken, cb) {
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "https://" + process.env.SERVER_SECURITY_SERVICE + ":" + process.env.PORT_SECURITY_SERVICE + "/services/security/verifyJwtToken/",        
        "body": JSON.stringify(requestVerifyJwtToken) 
    }, (error, response, body) => {
        if (error) {
            cb(error, null);
        }else{
            cb(null, JSON.parse(response.body));
        }        
    });
};