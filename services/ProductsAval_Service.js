let Request = require("request");
let getCatalogoModel = require('../models/GetCatalog_Model');

exports.GetProductDetail = function (product, cb) {
    console.log(product);
    Request.get({
        "headers": { "content-type": "application/json" },
        "url": "http://localhost:8080/v2/producto/" + product.id
    }, (error, response, body) => {
        if (error) {
            cb(error, null);
        } else {
            var productDetail = JSON.parse(response.body);
            product.description = productDetail.descripcion;
            product.oldPrice = productDetail.precio;
            product.availibilityCount = productDetail.cantidad_disponible;
            product.categoryId = productDetail.categoria;
            cb(null, product);
        }
    });
}

exports.GetInventory = function (requestProducts, _Products) {
    Request.get({
        "headers": { "content-type": "application/json" },
        "url": "http://localhost:8080/v2/producto/inventory"
    }, (error, response, body) => {
        if (error) {
            _Products(error, null);
        }else{
            getCatalogoModel.GetBasicModel(JSON.parse(response.body), function (error, modelProducts) {
                _Products(error, modelProducts);
            });
        }        
    });
}

exports.GetProduct = function (modelProducts, index, limit, _Product) {
    invokeSyncProduct(modelProducts, index, limit, _Product);
}

function invokeSyncProduct(modelProducts, index, limit, _Product) {
    idProduct = modelProducts.products[index].id;
    Request.get({
        "headers": { "content-type": "application/json" },
        "url": "http://localhost:8080/v2/producto/" + idProduct
    }, (error, response, body) => {
        if (error) {
            _Product(error, null);
        }else{
            productDetail = JSON.parse(response.body);
            modelProducts.products[index].description = productDetail.descripcion;
            modelProducts.products[index].oldPrice = productDetail.precio;
            modelProducts.products[index].availibilityCount = productDetail.cantidad_disponible;
            modelProducts.products[index].categoryId = productDetail.categoria;
            if (index < limit - 1) {
                index++;
                invokeSyncProduct(modelProducts, index, limit, _Product);
            } else {
                _Product(null, modelProducts);
            } 
        }        
    });
}

