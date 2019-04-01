let cache = require('memory-cache');
let getCatalogManager = require('../managers/GetCatalog_Manager');
let getSecurityManager = require('../managers/Security_Manager');
let auditService = require('../services/Audit_Service');
let mongoDB = require('../database/MongoDB');

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

    try {
        let requestProducts = {
            "All": req.body.requestPayload.All,
            "CountProduct": req.body.requestPayload.CountProduct,
            "Availability": req.body.requestPayload.Availability,
            "NameCategory": req.body.requestPayload.NameCategory,
            "InitialRangePrice": req.body.requestPayload.InitialRangePrice,
            "FinalRangePrice": req.body.requestPayload.FinalRangePrice
        };
        
        let token = req.header("X-Session");
        let id = req.header("X-Channel");
        let ip = req.header("X-IPAddr");
        let uuid = req.header("X-RqUID");       

        if (token == undefined) {
            token = req.body.requestHeader.session;
        }
        if (id == undefined) {
            id = req.body.requestHeader.channel;
        }
        console.log("GetVerifyJwtToken");
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
                    auditService.Add(uuid, ip, id, uuid, null, null, "ConsultarCatalogo", "Consultar", new Buffer(JSON.stringify(requestProducts)).toString('base64'));
                    console.log("GetCatalogModel");
                    getCatalogManager.GetCatalogModel(requestProducts, function (error, modelProducts) {
                        if (error != null) {
                            response.responseHeader.status.code = 500;
                            response.responseHeader.status.description = error;
                            response.responsePayload.result = false;
                            res.status(500).json(response);
                        } else {
                            if (cache.get('products') != null) {
                                console.log("Cache GetCollection");
                                var products = cache.get('products');
                                if (requestProducts.All != true) {
                                    if (requestProducts.Availability == true) {
                                        products = products.filter(function (product) {
                                            return (parseInt(product.availibilityCount) > 0);
                                        });
                                    }
                                    if (requestProducts.NameCategory != null) {
                                        products = products.filter(function (product) {
                                            return (product.categoryId == requestProducts.NameCategory);
                                        });
                                    }
                                    if (requestProducts.InitialRangePrice != null) {
                                        products = products.filter(function (product) {
                                            return (parseInt(product.oldPrice) >= parseInt(requestProducts.InitialRangePrice));
                                        });
                                    }
                                    if (requestProducts.FinalRangePrice != null) {
                                        products = products.filter(function (product) {
                                            return (parseInt(product.oldPrice) <= parseInt(requestProducts.FinalRangePrice));
                                        });
                                    }
                                }
                                response.responseHeader.status.code = 200;
                                response.responseHeader.status.description = "Transacción exitosa";
                                response.responsePayload.result = true;
                                response.responsePayload.products = products;
                                res.setHeader(
                                    "Access-Control-Allow-Origin", "*",
                                    "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
                                );
                                res.status(200).json(response);
                            } else {
                                var collection = "ProductoDetalle";
                                console.log("GetCollection");
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
                                                modelProducts.products[indexProductToUpdate].ratingsCount = Math.floor(Math.random() * (5 - 1) + 1);
                                                modelProducts.products[indexProductToUpdate].name = productoDetalle[i].informacionAdicional;
                                                modelProducts.products[indexProductToUpdate].discount = productoDetalle[i].descuento;
                                                modelProducts.products[indexProductToUpdate].categoryId = productoDetalle[i].categoria;
                                                if (parseInt(productoDetalle[i].descuento) > 0) {
                                                    modelProducts.products[indexProductToUpdate].newPrice = parseInt(modelProducts.products[indexProductToUpdate].oldPrice) - ((parseInt(productoDetalle[i].descuento) * parseInt(modelProducts.products[indexProductToUpdate].oldPrice)) / 100);
                                                } else {
                                                    modelProducts.products[indexProductToUpdate].newPrice = parseInt(modelProducts.products[indexProductToUpdate].oldPrice);
                                                }
                                                modelProducts.products[indexProductToUpdate].images.push(
                                                    {
                                                        "small": productoDetalle[i].imagenDefaultPequena,
                                                        "medium": productoDetalle[i].imagenDefaultMediana,
                                                        "big": productoDetalle[i].imagenDefaultGrande
                                                    }
                                                );
                                            }
                                        }
                                        response.responseHeader.status.code = 200;
                                        response.responseHeader.status.description = "Transacción exitosa";
                                        response.responsePayload.result = true;
                                        response.responsePayload.products = modelProducts.products;
                                        cache.put('products', response.responsePayload.products);
                                        res.setHeader(
                                            "Access-Control-Allow-Origin", "*",
                                            "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
                                        );
                                        res.status(200).json(response);
                                    }
                                });
                            }
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