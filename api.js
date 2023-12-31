require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const drinkRoute = require('./routes/drinkRoutes');
const adminRoute = require('./routes/adminRoute');

const multer = require("multer");
const path = require('path');
const {initializeApp} = require('firebase/app');
const fireFunc = require('firebase-functions');
const { onRequest } = require('firebase-functions/v1/https');
const fileParser = require('express-multipart-file-parser');

const firebaseConfig = {
   apiKey: process.env.FIRE_API_KEY,
   authDomain: process.env.FIRE_AUTH_DOM,
   databaseURL:process.env.FIRE_REAL_DB,
   projectId: process.env.FIRE_PROJ_ID,
   storageBucket: process.env.FIRE_STORAGE_BUCKET,
   messagingSenderId: process.env.FIRE_MESS_SERV,
   appId: process.env.FIRE_APP_ID,
   measurementId: process.env.FIRE_MESSURE_ID
 };

 

const app = initializeApp(firebaseConfig);
exports.app = app;
const api = express();

//Parsing Data
api.use(fileParser);
api.use(bodyParser.json());

// //CORS
api.use((req, res, next) => {
   // Set CORS headers
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   // Handle preflight requests (OPTIONS)
   if (req.method === 'OPTIONS') {
     return res.sendStatus(200); // Respond with a 200 status for preflight requests
   }
   // Continue processing for non-preflight requests
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
   const errors = error.errors? error.errors : [];
   res.status(status).json({
      message : message,
      errors : errors
   });
});

exports.drinkAPI = fireFunc.https.onRequest(api);


// api.listen(3000,()=>{
//    console.log("express server listening...");
// })
