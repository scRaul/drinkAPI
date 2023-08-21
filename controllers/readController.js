const fs = require("fs");
const path = require("path");

const Drink = require("../models/drink");
const { fileURLToPath } = require("url");


exports.getAllDrinks = (req,res,next) => {
    Drink.find()
    .then(drinks => {
        res.status(200)
        .json({
            message : "Fetched list of drinks",
            drinks: drinks
        });
    }).catch( err => {
        next(err);
    })
}

exports.getDrinkByName = (req,res,next) => {
    const drinkName = req.params.drinkName;
    Drink.findOne({name : drinkName})
    .then( drink => {
        if(!drink ){
            throw new Error('nill');
        }
        res.status(200).json({
            message: "Found this drink",
            drink: drink
        })
    }).catch( err =>{
        next(err);
    });
}

