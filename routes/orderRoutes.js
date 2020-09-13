const express = require('express');

const router = express.Router();

const orderController = require("../controllers/orderController");

router.post('/addOrder', orderController.addOrder);
router.get('/getOrders/:userid', orderController.getOrders);

module.exports = router;