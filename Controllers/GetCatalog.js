let getCatalogManager = require('../managers/GetCatalog_Manager');
let getSecurityManager = require('../managers/Security_Manager');
let mongoDB = require('../database/MongoDB');

exports.GetCatalog = function (req, res) {

    let requestProducts = {
        "All": req.body.All,
        "CountProduct": req.body.requestPayload.CountProduct,
        "Availability": req.body.requestPayload.Availability,
        "NameCategory": req.body.requestPayload.NameCategory,
        "InitialRangePrice": req.body.requestPayload.InitialRangePrice,
        "FinalRangePrice": req.body.requestPayload.FinalRangePrice,

    };

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

    let token = req.header("X-Session");
    let id = req.header("X-Channel");

    if(token == undefined){
        token = req.body.requestHeader.session;        
    }
    if(id == undefined){
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
                getCatalogManager.GetCatalogModel(requestProducts, function (error, modelProducts) {
                    if (error != null) {
                        response.responseHeader.status.code = 500;
                        response.responseHeader.status.description = error;
                        response.responsePayload.result = false;
                        res.status(500).json(response);
                    } else {
                        var collection = "ProductoDetalle";
                        mongoDB.GetCollection(collection, function (err, productoDetalle) {
                            if (err) {
                                response.responseHeader.status.code = 500;
                                response.responseHeader.status.description = err;
                                response.responsePayload.result = false;
                                res.status(500).json(response);
                            } else {
                                var limit = Object.keys(productoDetalle).length;
                                for (var i = 0; i < limit; i++) {
                                    var filter = productoDetalle[i].idProducto;
                                    var indexProductToUpdate = modelProducts.products.findIndex(function (item, index) {
                                        return item.id === filter;
                                    });
                                    if (indexProductToUpdate != -1) {
                                        modelProducts.products[indexProductToUpdate].ratingsValue = productoDetalle[i].calificacion;
                                        modelProducts.products[indexProductToUpdate].name = productoDetalle[i].informacionAdicional;
                                        modelProducts.products[indexProductToUpdate].discount = productoDetalle[i].descuento;
                                        modelProducts.products[indexProductToUpdate].categoryId = productoDetalle[i].categoria;
                                        modelProducts.products[indexProductToUpdate].images.push(
                                            {
                                                "small": "", /* Se deshabilita confomre los solicita front. -> productoDetalle[i].imagenDefaultPequena */
                                                "medium": productoDetalle[0].imagenDefaultMediana,
                                                "big": "" /* Se deshabilita confomre los solicita front. -> roductoDetalle[i].imagenDefaultGrande */
                                            }
                                        );
                                    }
                                }
                                response.responseHeader.status.code = 200;
                                response.responseHeader.status.description = "Transacción exitosa";
                                response.responsePayload.result = true;
                                response.responsePayload.products = modelProducts.products;
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
        }
    });
}