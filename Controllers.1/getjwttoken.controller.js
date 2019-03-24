var model = require('../manager/getJwtToken.model');

exports.getToken = function (req, res) {
    let responseJwtToken = {
        "responseHeader": {
            "responseInfo": {
                "system": "D07-TS-Securityservices",
                "responseDate": new Date().toISOString()
            },
            "status": {
                "code": "200",
                "description": "Success"
            }
        },
        "responsePayload": {
            "token": {}
        }
    };

    model.getTokenJWT(req.body.requestPayload.Id).then(data => {
        if (typeof data !== 'undefined' && data.length > 0) {

            responseJwtToken.responsePayload.token = data;
            responseJwtToken.responseHeader.status.code = "00";
            responseJwtToken.responseHeader.status.description = "Success";

            res.status(200).json(responseJwtToken);
        } else {
            responseJwtToken.responseHeader.status.code = "405";
            responseJwtToken.responseHeader.status.description = "Not Generate token";
            responseJwtToken.responsePayload.token = {};

            res.status(405).json(responseJwtToken);
        }

    }, err => {
        responseJwtToken.responseHeader.status.code = "405";
        responseJwtToken.responseHeader.status.description = err;
        responseJwtToken.responsePayload.token = {};

        res.status(405).json(responseJwtToken);
    });
}

exports.verifyToken = function (req, res) {
    let responseVerifyToken = {
        "responseHeader": {
            "responseInfo": {
                "system": "D07-TS-Securityservices",
                "responseDate": new Date().toISOString()
            },
            "status": {
                "code": "200",
                "description": "Success"
            }
        },
        "responsePayload": {
            "verify": false
        }
    };

    model.verifyToken(req.body.requestPayload.Id, req.body.requestHeader.token).then(data => {

        if (data) {
            responseVerifyToken.responsePayload.verify = data;
            responseVerifyToken.responseHeader.status.code = "00";
            responseVerifyToken.responseHeader.status.description = "Success";

            res.status(200).json(responseVerifyToken);
        } else {
            responseVerifyToken.responseHeader.status.code = "01";
            responseVerifyToken.responseHeader.status.description = "Invalid JWT validation";
            responseVerifyToken.responsePayload.verify = data;

            res.status(200).json(responseVerifyToken);
        }
    }, err => {
        responseVerifyToken.responseHeader.status.code = "01";
        responseVerifyToken.responseHeader.status.description = err;
        responseVerifyToken.responsePayload.verify = "";

        res.status(200).json(responseVerifyToken);
    });
}