var express = require('express');
var router = express.Router();

/* GET users listing. */
let getCatalog = require('../Controllers/GetCatalog');
let getProduct = require('../Controllers/GetProduct');
let reserveProducts = require('../Controllers/ReserveProducts');
router.get('/api/products/catalog/', getCatalog.GetCatalog);
router.get('/api/products/product/', getProduct.GetProduct);
router.post('/api/products/reserve/', reserveProducts.ReserveProducts);

module.exports = router;