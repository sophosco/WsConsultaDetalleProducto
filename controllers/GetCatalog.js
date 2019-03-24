let getCatalogManager = require('../managers/GetCatalog_Manager');

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
            "products": ""
        }
    };

    getCatalogManager.GetCatalogModel(function (modelProducts) {         
        response.responseHeader.status.code = 200;
        response.responseHeader.status.description = "Key";
        response.responsePayload.result = true;
        response.responsePayload.products = modelProducts.products;
        res.status(200).json(response);        
    });    

}