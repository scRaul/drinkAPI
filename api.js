const express = require('express');
const bodyParser = require('body-parser');
const drinkRoute = require('./routes/drinkRoutes');
const mongoose = require("mongoose");



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

mongoose
   .connect('mongodb+srv://scraul17:jPVEJZSS3lJPOnnd@cluster0.el9ts55.mongodb.net/drinks?retryWrites=true&w=majority')
   .then(result =>{
      api.listen(3000,() => {
         console.log("Express server running... ");
      });
   })
   .catch(err =>{
      console.log(err)
   });