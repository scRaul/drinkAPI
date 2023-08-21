const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const fs = require("fs");
const path = require("path");
const Drink = require("../models/drink");
const { fileURLToPath } = require("url");



exports.login = (req,res,next) =>{
    const username = req.body.username;
    const password = req.body.password;
    let loadedAdmin; 
    Admin.findOne({username: username})
        .then(admin =>{
            if(!admin){
                throw new Error("invalid login");
            }
            loadedAdmin = admin;
            return bcrypt.compare(password,admin.password);
        })
        .then( isEqual =>{
            if(!isEqual ){
                throw new Error("Not Valid Password");
            }
            const token = jwt.sign({
                admin: loadedAdmin.username
            },'supersecretkey',
            {expiresIn: '3h'}
            );
            res.status(200).json({
                token: token
            });
        }).catch(err =>{
            next(err);
        })
        

}

exports.addADrink = (req,res,next ) =>{

    const name = req.body.name;
    const price = req.body.price;
    const ingrediantList = req.body.ingrediantList; 
    const description = req.body.description;
    const imageUrl = req.file.path;

    const drink = new Drink({
        name: name,
        price: price,
        description:description,
        imageUrl: imageUrl,
        ingrediantList: ingrediantList
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
            console.log(err);
            next();
        })
  
}

exports.updateDrink = (req,res,next) =>{
    const drinkName = req.params.drinkName;
    const description = req.body.description;
    const price = req.body.price;
    const ingrediantList = req.body.ingrediantList;
    let imageUrl = req.body.image;
    let fileUploaded = false;
    if ( req.file ){
        console.log("a new file was add!");
        imageUrl = req.file.path;
        fileUploaded = true;
    }
    if( !imageUrl ){
        throw new Error("no file picked");
        next();
    }

    Drink.findOne({name:drinkName })
        .then(drink =>{
            if( !drink ){
                throw new Error('nil');
            }
            if(fileUploaded){
                console.log("deleting the old file");
                clearImage(drink.imageUrl);
            }
            drink.name = drinkName;
            drink.description = description;
            drink.ingrediantList = ingrediantList;
            drink.price = price;
            drink.imageUrl = imageUrl;
            return drink.save();
        })
        .then(result => {
            res.status(200).json({message:"drink updated!", drink: result });
        })
        .catch(err =>{
            next(err);
        })

}
exports.deleteDrink = (req,res,next) =>{
   const drinkName = req.params.drinkName; 
   Drink.findOne({name:drinkName})
   .then( drink =>{
    clearImage(drink.imageUrl);
    return Drink.findOneAndRemove({name:drinkName});

   }).then(result =>{
        res.status(200).json({message:"drink removed!",drink:result});
   }).catch( err =>{
        next(err);
   });
   console.log('removed item');
}

const clearImage = filePath =>{
    filePath = path.join(__dirname,'..',filePath);
    fs.unlink(filePath,err => console.log(err));
}