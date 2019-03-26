var express = require('express');
var router = express.Router();

/* GET users listing. */
let getCatalog = require('../Controllers/GetCatalog');
let getProduct = require('../Controllers/GetProduct');
let reserveProducts = require('../Controllers/ReserveProducts');
router.get('/products/catalog/', getCatalog.GetCatalog);
router.get('/products/product/', getProduct.GetProduct);
router.post('/products/reserve/', reserveProducts.ReserveProducts);

module.exports = router;