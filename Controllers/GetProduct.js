let getProductManager = require('../managers/GetProduct_Manager');
let getSecurityManager = require('../managers/Security_Manager');
let mongoDB = require('../database/MongoDB');

exports.GetProduct = function (req, res) {

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
            "product": ""
        }
    };

    try {
        
        let productRequest = {
            "id": req.body.requestPayload.id
        };
        let token = req.header("X-Session");
        let id = req.header("X-Channel");

        if (token == undefined) {
            token = req.body.requestHeader.session;
        }
        if (id == undefined) {
            id = req.body.requestHeader.channel;
        }

        getSecurityManager.GetVerifyJwtToken(token, id, function (error, responseVerifyJwtToken) {
            if (error != null) {
                response.responseHeader.status.code = 500;
                response.responseHeader.status.description = error;
                response.responsePayload.result = false;
                res.status(500).json(response);
            } else {
                if (responseVerifyJwtToken.responseHeader.status.code == "01") {
                    response.responseHeader.status.code = 401;
                    response.responseHeader.status.description = responseVerifyJwtToken.responseHeader.status.description;
                    response.responsePayload.result = false;
                    res.status(401).json(response);
                } else {
                    getProductManager.GetProductManager(productRequest, function (error, product) {
                        if (error != null) {
                            response.responseHeader.status.code = 500;
                            response.responseHeader.status.description = error;
                            response.responsePayload.result = false;
                            res.status(500).json(response);
                        } else {
                            var collection = "ProductoDetalle";
                            var filter = { idProducto: product.id };
                            mongoDB.GetCollectionFilter(collection, filter, function (error, result) {
                                if (error != null) {
                                    response.responseHeader.status.code = 500;
                                    response.responseHeader.status.description = error;
                                    response.responsePayload.result = false;
                                    res.status(500).json(response);
                                } else {
                                    product.ratingsValue = result[0].calificacion;
                                    product.name = result[0].informacionAdicional;
                                    product.discount = result[0].descuento;
                                    product.categoryId = result[0].categoria;
                                    collection = "Galeria";
                                    mongoDB.GetCollectionFilter(collection, filter, function (error, result) {
                                        if (error != null) {
                                            response.responseHeader.status.code = 500;
                                            response.responseHeader.status.description = error;
                                            response.responsePayload.result = false;
                                            res.status(500).json(response);
                                        } else {
                                            response.responseHeader.status.code = 200;
                                            response.responseHeader.status.description = "Transacción exitosa";
                                            response.responsePayload.result = true;
                                            for (var i = 0; i < result.length; i++) {
                                                product.images.push(
                                                    {
                                                        "small": result[i].imagenPequena,
                                                        "medium": result[i].imagenMediana,
                                                        "big": result[i].imagenGrande
                                                    }
                                                );
                                            }
                                            response.responsePayload.product = product;
                                            res.setHeader(
                                                "Access-Control-Allow-Origin", "*",
                                                "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
                                            );
                                            res.status(200).json(response);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });
    } catch (error) {
        response.responseHeader.status.code = 500;
        response.responseHeader.status.description = "Error: " + error;
        response.responsePayload.result = false;
        res.status(500).json(response);
    }
}