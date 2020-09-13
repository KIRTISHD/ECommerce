const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const helmet = require('helmet');

const app = express();

const userRoutes=require('./routes/userRoutes');


app.use(bodyParser.json());

app.use(cors());
app.use(helmet());

app.use('/user',userRoutes);
//app.use('/login',userRoutes);

app.use((error, req, res, next) => {
	const message = error.message;
    res.status(500).json({ message: message});
});



mongoose
    .connect(
       'mongodb+srv://kd:kd@123@ecommerce.n5ajl.mongodb.net/Ecommerce?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(result => {
        console.log("Backend Started");
        app.listen(process.env.PORT || 3000);
    })
    .catch(err => console.log("err->" + err));
