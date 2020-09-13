const express = require('express');

const router = express.Router();

const productController = require("../controllers/productController");

router.post('/addProduct', productController.addProduct);
// for user 
router.get('/getProducts', productController.getProducts);
// for admin (shows product with quantity 0)
router.get('/getAllProducts', productController.getAllProducts);
router.put('/updateProduct/:productid', productController.updateProduct);
router.delete('/deleteProduct/:productid', productController.deleteProduct);

module.exports = router;