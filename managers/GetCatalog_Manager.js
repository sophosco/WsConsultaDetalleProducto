let productsAvalService = require('../services/ProductsAval_Service');

exports.GetCatalogModel = function(_Products){
    productsAvalService.GetInventory(function (modelProducts) { 
        _Products(modelProducts);                         
    });    
}
