const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require('./routes/userRoutes');

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
app.use('/user', userRoutes);

mongoose
    .connect(
        'mongodb+srv://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PASSWD + '@ecommerce.n5ajl.mongodb.net/' + process.env.DB_NAME + '?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(result => {
        console.log("Backend Started");
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => console.log("err->" + err));
