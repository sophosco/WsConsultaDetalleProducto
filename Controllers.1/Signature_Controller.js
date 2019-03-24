let Signature = require('../manager/Signature_Manager');
let keymanager = require('../manager/Key_Manager');
exports.GenerateSignature = function (req, res) {
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
            "Signature": ""
        }
    };
    keymanager.getkey(req.body.requestPayload.kid).then(key => {
        if (key == null) {
            response.responseHeader.status.code = 500;
            response.responseHeader.status.description = "Key not exist";
            res.status(500).json(response);
        } else {
            Signature.generatesignature(key, req.body.data).then(data1 => {
                if (data1 == null) {
                    response.responseHeader.status.code = 500;
                    response.responseHeader.status.description = "Not Generate Signature";
                    res.status(500).json(response);
                } else {
                    response.responseHeader.status.code = 200;
                    response.responseHeader.status.description = "Signature";
                    response.responsePayload.result = true;
                    response.responsePayload.Signature = data1;
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
exports.VerifySignature = function (req, res) {
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
            "Signature": ""
        }
    };
    keymanager.getkey(req.body.requestPayload.kid).then(key => {
        if (key == null) {
            response.responseHeader.status.code = 500;
            response.responseHeader.status.description = "Key not exist";
            res.status(500).json(response);
        } else {
            let payload = req.body.requestPayload.signature.payload;
            let protect = req.body.requestPayload.signature.signatures.protected;
            let signature = req.body.requestPayload.signature.signatures.signature;

            Signature.vefifysignature(key, payload + "." + protect + "." + signature).then(data1 => {

                if (data1 == null) {
                    response.responseHeader.status.code = 500;
                    response.responseHeader.status.description = "Not  Verify Signature";
                    res.status(500).json(response);
                } else {
                    response.responseHeader.status.code = 200;
                    response.responseHeader.status.description = "Signature";
                    response.responsePayload.result = true;
                    response.responsePayload.Signature = data1;
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