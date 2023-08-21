const express = require('express');
const bodyParser = require('body-parser');
const drinkRoute = require('./routes/drinkRoutes');
const adminRoute = require('./routes/adminRoute');
const mongoose = require("mongoose");
const multer = require("multer");
const path = require('path');





const api = express();

const fileStorage = multer.diskStorage({
   destination : ( req, file, cb) => {
      cb(null, 'images');
   },
   filename : (req,file,cb) => {
      cb(null,new Date().toISOString() + '-' + file.originalname);
   }
});

const fileFilter = (req,file,cb) => {
   if ( file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' ||
   file.mimetype == 'image/heic'){
      cb(null,true);
   }else{
      cb(null,false);
   }
}

//CORS
api.use((req,res,next) => {
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE ');
   res.setHeader('Aceess-Control-Allow-Header','Content-Type, Authorization');

   next();
});

//Parsing Data
api.use(bodyParser.json());
api.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image')); 

//serving static image
api.use('/images',express.static(path.join(__dirname,'images')));

// Routes

api.use('/admin',adminRoute);
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