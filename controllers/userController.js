const mongoose = require('mongoose');

const User = require('../models/user');

exports.registerUser = async (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const username = req.body.username;

    try {
        const newUser = new User({
            username: username,
            name: name,
            password: password,
            email: email

        });

        // new user saved
        const newUserSaved = await newUser.save();

        res.status(201).json({ message: 'New User Created!', mystatuscode: 1 });

    } catch (err) {
        console.log("err-" + err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    };
};

exports.loginUser = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {

        const userObj = await User.findOne({ email: email });

        if (!(userObj)) {
            res.status(404).json({ status: 'No such username present. Register first', mystatuscode: 0 });
            throw new Error('No such username present. Register first');
        }

        if (userObj.password != password) {
            res.status(404).json({ status: 'No such username present. Register first', mystatuscode: 0 });
            throw new Error('No such username present. Register first');
        }

        res.status(200).json({ status: 'user logged in succcessfully' });
    }

    catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

