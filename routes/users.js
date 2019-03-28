var express = require('express');
var router = express.Router();

/* GET users listing. */
let getCatalog = require('../controllers/GetCatalog');
let getProduct = require('../controllers/GetProduct');
let reserveProducts = require('../controllers/ReserveProducts');
router.post('/products/catalog/', getCatalog.GetCatalog);
router.post('/products/product/', getProduct.GetProduct);
router.post('/products/reserve/', reserveProducts.ReserveProducts);

module.exports = router;