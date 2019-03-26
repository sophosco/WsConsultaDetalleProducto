let productsAvalService = require('../services/ProductsAval_Service');

exports.GetCatalogModel = function(requestProducts, _Products){
    productsAvalService.GetInventory(requestProducts, function (error, modelProducts) { 
        _Products(error, modelProducts);                         
    });    
}
