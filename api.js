const express = require('express');
const bodyParser = require('body-parser');
const drinkRoute = require('./routes/drinks')


const api = express();

//CORS
api.use((req,res,next) => {
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE ');
   res.setHeader('Aceess-Control-Allow-Header','Content-Type, Authorization');

   next();
});

//Parsing Data
api.use(bodyParser.json());


// DRink ROute
api.use('/Drinks',drinkRoute);


api.listen(3000);