let getCatalogManager = require('../managers/GetCatalog_Manager');
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

    getCatalogManager.GetCatalogModel(function (modelProducts) {

        var collection = "ProductoDetalle";
        mongoDB.GetCollection(collection, function (err, productoDetalle) {
            if (err) {
                response.responseHeader.status.code = 500;
                response.responseHeader.status.description = err;
                response.responsePayload.result = true;
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
                                "small": productoDetalle[i].imagenDefaultPequena,
                                "medium": productoDetalle[i].imagenDefaultMediana,
                                "big": productoDetalle[i].imagenDefaultGrande
                            }
                        );

                    }
                }

                response.responseHeader.status.code = 200;
                response.responseHeader.status.description = "Key";
                response.responsePayload.result = true;
                response.responsePayload.products = modelProducts.products;
                res.status(200).json(response);
            }
        });

    });

}