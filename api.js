const express = require('express');
const bodyParser = require('body-parser');
const drinkRoute = require('./routes/drinkRoutes');
const adminRoute = require('./routes/adminRoute');
const mongoose = require("mongoose");
const multer = require("multer");
const path = require('path');

const api = express();

//CORS
api.use((req,res,next) => {
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE ');
   res.setHeader('Aceess-Control-Allow-Header','Content-Type, Authorization');

   next();
});

//Parsing Data
api.use((req,res,next)=>{
   console.log(req.body);
   next();
});
api.use(bodyParser.json());
api.use((req,res,next)=>{
   console.log(req.body);
   next();
});
//api.use(multer().none());
//serving static image
api.use('/images',express.static(path.join(__dirname,'images')));

// Routes
api.use('/admin',adminRoute);
api.use('/drinks',drinkRoute);
api.use((error,req,res,next)=>{
   console.log(error);
   const status = error.statusCode || 500; 
   const message = error.message;
   res.status(status).json({
      message : message,
   });
});

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