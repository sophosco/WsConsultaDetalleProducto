let keymanager = require('../manager/Key_Manager');

exports.GenerateKeyController = function (req, res) {
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
            "Key": ""
        }
    };

    keymanager.generate_key().then(data => {
        if (data == 'undefined' && data.length < 0) {
            response.responseHeader.status.code = 500;
            response.responseHeader.status.description = "Failed Key Generate";
            res.status(500).json(response);
        } else {
            response.responseHeader.status.code = 200;
            response.responseHeader.status.description = "Key";
            response.responsePayload.result = true;
            response.responsePayload.Key = data;
            res.status(200).json(response);
        }

    }, err => {
        response.responseHeader.status.code = 500;
        response.responseHeader.status.description = err;
        res.status(500).json(response);
    });

}
exports.GetKeyController = function (req, res) {
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
            "Key": ""
        }
    };
    keymanager.getkey(req.body.requestPayload.kid).then(data => {
         
        if (data == null) {
            response.responseHeader.status.code = 500;
            response.responseHeader.status.description = "Key not exist";
            res.status(500).json(response);
        } else {
            response.responseHeader.status.code = 200;
            response.responseHeader.status.description = "Key";
            response.responsePayload.result = true;
            response.responsePayload.Key = data;
            res.status(200).json(response);
        }

    }, err => {
        response.responseHeader.status.code = 500;
        response.responseHeader.status.description = err;
        res.status(500).json(response);
    });

}