const mongoose = require('mongoose');

const Product = require('../models/product');
const Order = require('../models/order');

exports.addOrder = async (req, res, next) => {
    const amount = req.body.amount;
    const userid = req.body.userid;
    const productsOrdered = req.body.products;
    try {

        const listofProducts = await Product.find().where('_id').in(productsOrdered).exec();

        // listofProducts.forEach(obj => {
        //     obj.Quantity = obj.Quantity - 1;
        //     await obj.save();
        // });

        for (const obj of listofProducts) {
            obj.Quantity = obj.Quantity - 1;
            await obj.save();
        }

        const order = new Order({
            Amount: amount,
            Products: productsOrdered,
            UserID: userid
        })

        const orderPlaced = await order.save();

        res.status(200).json({ message: 'Order Added' });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getOrders = async (req, res, next) => {
    const userid = req.params.userid;

    try {
        const orders = Order.find({ 'UserID': userid });

        res.status(200).json({ message: 'Orders list', orders: orders });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}