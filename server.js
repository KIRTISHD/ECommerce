const express = require('express');

const app = express();

console.log("gopal");

app.get('/getfunc', (req, res, next) => {
	res.json({"message": "hello gopal"});
	
})

app.listen(3000);