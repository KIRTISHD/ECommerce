const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    ProductName: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    ImageUrl: {
        type: String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Quantity: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('product', productSchema, 'Products');