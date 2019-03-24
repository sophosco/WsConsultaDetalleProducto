var Request = require("request");
let getCatalogoModel = require('../models/GetCatalog_Model');

exports.GetInventory = function (_Products) {
    Request.get({
        "headers": { "content-type": "application/json" },
        "url": "http://localhost:8080/v2/producto/inventory"
    }, (error, response, body) => {
        if (error) {
            return console.dir("GetInventory: " + error);             
        }
        getCatalogoModel.GetBasicModel(JSON.parse(response.body), function (modelProducts) { 
            _Products(modelProducts);                      
        });
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
            return console.dir("invokeSyncProduct: " + error);
        }
        _product = JSON.parse(response.body);
        
        modelProducts.products[index].description = _product.descripcion;
        modelProducts.products[index].oldPrice = _product.precio;
        modelProducts.products[index].availibilityCount = _product.cantidad_disponible;
        modelProducts.products[index].categoryId = _product.categoria;

        if (index < limit - 1) {            
            index++;
            invokeSyncProduct(modelProducts, index, limit, _Product);
        } else {
            _Product(modelProducts);
        }
    });
}

