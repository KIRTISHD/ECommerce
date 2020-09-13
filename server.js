const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
require('dotenv').config();

app.use(bodyParser.json());

app.use(cors());
app.use(helmet());

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

app.use('/product', productRoutes);
app.use('/order', orderRoutes);

mongoose
    .connect(
        //'mongodb://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PASSWD + '@cluster0-shard-00-00-vccpc.mongodb.net:27017,cluster0-shard-00-01-vccpc.mongodb.net:27017,cluster0-shard-00-02-vccpc.mongodb.net:27017/' + process.env.DB_NAME + '?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }
        'mongodb+srv://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PASSWD + '@ecommerce.n5ajl.mongodb.net/' + process.env.DB_NAME + '?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(result => {
        console.log("Backend Started");
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => console.log("err->" + err));
