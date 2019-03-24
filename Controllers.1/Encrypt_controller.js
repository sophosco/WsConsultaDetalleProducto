let Encrypt = require('../manager/Encrypt_Manager');
let keymanager = require('../manager/Key_Manager');
exports.EncryptData = function (req, res) {
    let response = {
        "responseHeader": {
            "responseInfo": {
                "system": "POC_TS_JOSE",
                "responseDate": new Date().toISOString()
            },
            "status": {
                "code": "200",
                "description": "Success"
            }
        },
        "responsePayload": {
            "result": false,
            "EncryptData": ""
        }
    };
    keymanager.getkey(req.body.requestPayload.kid).then(key => {
        if (key == null) {
            response.responseHeader.status.code = 500;
            response.responseHeader.status.description = "Key not exist";
            res.status(500).json(response);
        } else {

            Encrypt.Encrypt(key, req.body.requestPayload.data).then(data1 => {
                   if (data1 == null) {
                    response.responseHeader.status.code = 500;
                    response.responseHeader.status.description = "Not  Encrypt Data";
                    res.status(500).json(response);
                } else {
                    response.responseHeader.status.code = 200;
                    response.responseHeader.status.description = "Signature";
                    response.responsePayload.result = true;
                    response.responsePayload.EncryptData = data1;
                    res.status(200).json(response);
                }
            }, err => {
                response.responseHeader.status.code = 500;
                response.responseHeader.status.description = err;
                res.status(500).json(response);
            });

        }

    }, err => {
        response.responseHeader.status.code = 500;
        response.responseHeader.status.description = err;
        res.status(500).json(response);
    });
}