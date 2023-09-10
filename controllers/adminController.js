require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const fs = require("fs");
const path = require("path");
const Drink = require("../models/drink");
const { fileURLToPath } = require("url");
const { error } = require('console');
const {removeImage} = require('../middleware/imageHandler');

exports.login = async (req,res,next) =>{
    console.log('login end point')
    const username = req.body.username;
    const password = req.body.password;

    try{
        let admin = await Admin.findOne(username);
        // if(admin instanceof Error){
        if(!admin){
            const error = new Error('incorrect usernane');
            error.statusCode = 403;
            throw error;
        }
        let isEqual = await bcrypt.compare(password,admin.password);

        if(!isEqual){
            const error = new Error('incorrect password');
            error.statusCode = 403;
            throw error;
        }
        const token = jwt.sign({
            admin: admin.username
        },process.env.SUPER_SECRET,
        {expiresIn: '1h'}
        );
        console.log(token);
        res.status(200).json({
            token: token
        });
    }catch(error){
        if(!error.statusCode) {error.statusCode = 500;}
        next(error);
    }
}

exports.addADrink = async (req,res,next ) =>{
    console.log('add end point')
    const name = req.body.name;
    const price = req.body.price;
    const ingredientList = req.body.ingredientList; 
    const description = req.body.description;

    if(typeof req.files == 'undefined'){
        const error = new Error('No image provided');
        error.status = 422;
        throw error;
    }
    const imagePath = res.locals.path;
    const downloadURL = res.locals.downloadURL;

    const drink = new Drink(name, price,description,imagePath,downloadURL,ingredientList);
    drink
        .save( (result,err) =>{
            if(result){
                res.status(201).json({
                    message:"new drink added succesfully",
                    drink: drink
                });
            }
            else{
                next(err);
            }
        })  
}

exports.updateDrink = async (req,res,next) =>{

    console.log('update drink end point');
    const drinkName = req.params.drinkName;
    let snap;
    try{
        snap = await Drink.findOne(drinkName);
        if(!snap){
            const error = new Error("could not find post");
            error.statusCode = 404;
            throw error;
        }
    }catch(err){
        return next(err);
    }
    const description = req.body.description;
    const price = req.body.price;
    const ingredientList = req.body.ingredientList;


    let imagePath;
    let downloadURL;
    let fileUploaded = false;
    if(req.files.length > 0){
        console.log("a new file was add!");
        imagePath = res.locals.path;
        downloadURL = res.locals.downloadURL;
        fileUploaded = true;
    }else{
        downloadURL = snap.downloadURL;
        imagePath = snap.imagePath;
    }
    if(fileUploaded){
        console.log("deleting the old file");
        removeImage(snap.imagePath);
    }
    let drink = new Drink(drinkName,price,description,imagePath,downloadURL,ingredientList);
    drink
    .save( (result,err) =>{
        if(result){
            res.status(201).json({
                message:"new drink added succesfully",
                drink: drink
            });
        }
        else{
            next(err);
        }
    })  

}
exports.deleteDrink = async (req,res,next) =>{
    console.log('delete endpoint')
   const drinkName = req.params.drinkName; 

   try{
        let drink = await Drink.findOne(drinkName);
        if(drink instanceof Error){
            const error = new Error('no drink was found');
            error.statusCode = 404;
            throw error;
        }
        removeImage(drink.imagePath);
        console.log('127')
        Drink.remove(drinkName,(result,error)=>{
            if(result){
                res.status(200).json({message:"drink removed",drink:drink});
            }else{
                throw new Error('not found')
            }  
        });
    }catch(error){
        next(error);
    }
}

const clearImage = filePath =>{
    filePath = path.join(__dirname,'..',filePath);
    fs.unlink(filePath,err => console.log(err));
}