const mongoose = require('mongoose');

const Product = require('../models/product');

exports.addProduct = async (req, res, next) => {

    const ProductName = req.body.productname;
    const Description = req.body.description;
    const ImageUrl = req.body.imageurl;
    const Price = req.body.price;
    const Quantity = req.body.quantity;

    const product = new Product({
        ProductName: ProductName,
        Description: Description,
        ImageUrl: ImageUrl,
        Price: Price,
        Quantity: Quantity
    });

    try {
        const productObj = await product.save();

        res.status(201).json({ message: "Product Created" });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ 'isDeleted': false }).where('Quantity').gt(0).exec();

        res.status(200).json({ products: products });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find({ 'isDeleted': false });

        res.status(200).json({ products: products });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.updateProduct = async (req, res, next) => {

    const productid = req.params.productid;

    const ProductName = req.body.productname;
    const Description = req.body.description;
    const ImageUrl = req.body.imageurl;
    const Price = req.body.price;
    const Quantity = req.body.quantity;

    try {
        // check if id from client is valid mongo id
        if (!mongoose.isValidObjectId(productid)) {
            res.status(400).json({ message: 'Invalid ObjectId' });
            throw new Error('Invalid ObjectId');
        }

        // to check if such id is present in database 
        const isProductPresent = await Product.findById(productid);
        if (!isProductPresent) {
            res.status(404).json({ message: 'Product not found' });
            throw new Error('Product not found');
        }

        isProductPresent.ProductName = ProductName;
        isProductPresent.Description = Description;
        isProductPresent.ImageUrl = ImageUrl;
        isProductPresent.Price = Price;
        isProductPresent.Quantity = Quantity;

        const isUpdated = await isProductPresent.save();

        res.status(200).json({ message: 'Product Updated' });

    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteProduct = async (req, res, next) => {

    const productid = req.params.productid;

    try {
        // check if id from client is valid mongo id
        if (!mongoose.isValidObjectId(productid)) {
            res.status(400).json({ message: 'Invalid ObjectId' });
            throw new Error('Invalid ObjectId');
        }

        // to check if such id is present in database 
        const isProductPresent = await Product.findById(productid);
        if (!isProductPresent) {
            res.status(404).json({ message: 'Product not found' });
            throw new Error('Product not found');
        }

        // ----------------soft delete -----------------------
        isProductPresent.isDeleted = true;

        const isDeleted = await isProductPresent.save();
        // ---------------------------------------------------

        // --------------normal delete -----------------------
        // const isDeleted = await Product.deleteOne(productid);
        //----------------------------------------------------

        res.status(200).json({ message: 'Product Deleted' });

    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}