const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const fs = require("fs");
const path = require("path");
const Drink = require("../models/drink");
const { fileURLToPath } = require("url");
const { error } = require('console');



exports.login = (req,res,next) =>{
    const username = req.body.username;
    const password = req.body.password;
    let loadedAdmin; 
    Admin.findOne({username: username})
        .then(admin =>{
            if(!admin){
                const error = new Error('incorrect username');
                error.statusCode = 401;
                throw error;
            }
            loadedAdmin = admin;
            return bcrypt.compare(password,admin.password);
        })
        .then( isEqual =>{
            if(!isEqual ){
               const error = new Error('incorrect password');
               error.statusCode = 401;
               throw error; 
            }
            const token = jwt.sign({
                admin: loadedAdmin.username
            },'supersecretkey',
            {expiresIn: '1h'}
            );
            res.status(200).json({
                token: token
            });
        }).catch(err =>{
            if(!error.statusCode) {error.statusCode = 500;}
            next(err);
        })
        

}

exports.addADrink = (req,res,next ) =>{

    const name = req.body.name;
    const price = req.body.price;
    const ingredientList = req.body.ingredientList; 
    const description = req.body.description;

    if(!req.file){
        const error = new Error('No image provided');
        error.status = 422;
        throw error;
    }
    const imagePath = res.locals.path;

    const drink = new Drink({
        name: name,
        price: price,
        description:description,
        imagePath: imagePath,
        ingredientList: ingredientList,
    });
    drink
        .save()
        .then(result =>{
            console.log(result);
            res.status(201).json({
                message:"new drink added succesfully",
                drink: drink
            });
        })
        .catch(err =>{
            if(!error.statusCode) {error.statusCode = 500;}
            next(err);
        })
  
}

exports.updateDrink = (req,res,next) =>{
    const drinkName = req.params.drinkName;
    const description = req.body.description;
    const price = req.body.price;
    const ingredientList = req.body.ingredientList;
    let imagePath = req.body.image;
    let fileUploaded = false;
    if ( req.file ){
        console.log("a new file was add!");
        imagePath = res.locals.path;
        fileUploaded = true;
    }
    if( !imagePath ){
        const error = new Error("no file picked");
        error.statusCode = 422;
        throw error;
    }

    Drink.findOne({name:drinkName })
        .then(drink =>{
            if( !drink ){
                const error = new Error("could not find post");
                error.statusCode = 404;
                throw error;
            }
            if(fileUploaded){
                console.log("deleting the old file");
                clearImage(drink.imagePath);
            }
            drink.name = drinkName;
            drink.description = description;
            drink.ingredientList = ingredientList;
            drink.price = price;
            drink.imagePath = imagePath;
            return drink.save();
        })
        .then(result => {
            res.status(200).json({message:"drink updated!", drink: result });
        })
        .catch(err =>{
            if(!error.statusCode ){error.statusCode = 500;}
            next(err);
        })

}
exports.deleteDrink = (req,res,next) =>{
   const drinkName = req.params.drinkName; 
   Drink.findOne({name:drinkName})
   .then( drink =>{
    if(!drink){
        const error = new Error('no drink was found');
        error.statusCode = 404;
        throw error;
    }
    clearImage(drink.imagePath);
    return Drink.findOneAndRemove({name:drinkName});

   }).then(result =>{
        res.status(200).json({message:"drink removed!",drink:result});
   }).catch( err =>{
        if(!error.statusCode){error.statusCode = 500;}
        next(err);
   });
   console.log('removed item');
}

const clearImage = filePath =>{
    filePath = path.join(__dirname,'..',filePath);
    fs.unlink(filePath,err => console.log(err));
}