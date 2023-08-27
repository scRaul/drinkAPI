const express = require('express');
const bodyParser = require('body-parser');
const drinkRoute = require('./routes/drinkRoutes');
const adminRoute = require('./routes/adminRoute');
const mongoose = require("mongoose");
const multer = require("multer");
const path = require('path');
const {initializeApp} = require('firebase/app');

const firebaseConfig = {
   apiKey: process.env.FIRE_API_KEY,
   authDomain: process.env.FIRE_AUTH_DOM,
   projectId: process.env.FIRE_PROJ_ID,
   storageBucket: process.env.FIRE_STORAGE_BUCKET,
   messagingSenderId: process.env.FIRE_MESS_SERV,
   appId: process.env.FIRE_APP_ID,
   measurementId: process.env.FIRE_MESSURE_ID
 };

 

const app = initializeApp(firebaseConfig);
exports.app = app;
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
   .connect(process.env.MONGO_DB)
   .then(result =>{
      api.listen(process.env.PORT || 3000,() => {
         console.log("Express server running... ");
      });
   })
   .catch(err =>{
      console.log(err)
   });