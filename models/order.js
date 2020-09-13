const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    Amount: {
        type: String,
        required: true
    },
    OrderDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    UserID:{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    Products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Products'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Orders', orderSchema, 'Orders');