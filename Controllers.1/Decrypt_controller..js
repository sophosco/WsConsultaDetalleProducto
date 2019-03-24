let Decrypt = require('../manager/Decrypt_Manager');
let keymanager = require('../manager/Key_Manager');
exports.DecryptData = function (req, res) {
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
            "decryptData": ""
        }
    };
    keymanager.getkey(req.body.requestPayload.kid).then(key => {
        if (key == null) {
            response.responseHeader.status.code = 500;
            response.responseHeader.status.description = "Key not exist";
            res.status(500).json(response);
        } else {

            Decrypt.Decrypt(key, req.body.requestPayload.data).then(data1 => {
                if (data1 == null) {
                    response.responseHeader.status.code = 500;
                    response.responseHeader.status.description = "Not  decrypt Data";
                    res.status(500).json(response);
                } else {
                    response.responseHeader.status.code = 200;
                    response.responseHeader.status.description = "DecryptData";
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