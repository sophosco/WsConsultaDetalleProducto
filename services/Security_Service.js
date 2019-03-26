let Request = require("request");

exports.VerifyJwtToken = function (requestVerifyJwtToken, cb) {
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "http://ec2-3-17-205-42.us-east-2.compute.amazonaws.com:3000/services/security/verifyJwtToken/",
        "body": JSON.stringify(requestVerifyJwtToken) 
    }, (error, response, body) => {
        if (error) {
            cb(error, null);
        }else{
            cb(null, JSON.parse(response.body));
        }        
    });
};