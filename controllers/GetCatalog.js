
exports.GetCatalog = function (req, res) {

    let response = {
        "responseHeader": {
            "responseInfo": {
                "system": "eCommerce_Catalog_Service",
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

    response.responseHeader.status.code = 200;
    response.responseHeader.status.description = "Key";
    response.responsePayload.result = true;
    response.responsePayload.Key = "Lista de Catalogo";
    res.status(200).json(response);

}