const fs = require("fs");
const path = require("path");

const Drink = require("../models/drink");
const { fileURLToPath } = require("url");


exports.getAllDrinks = async (req,res,next) => {
    try{
        let drinks = await Drink.findAll();
        if(drinks instanceof Error) {
             throw new Error('list is empty');
        }
        res.status(200)
        .json({
            message : "Fetched list of drinks",
            drinks: drinks
        });
    }catch( err ) {
        next(err);
    };
}

exports.getDrinkByName = async (req,res,next) => {
    const drinkName = req.params.drinkName;
    try{
        const drink = await Drink.findOne(drinkName);
        if(drink instanceof Error){
            const error = new Error('no drink was found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: "Found this drink",
            drink: drink
        });
    }catch( err ){
        next(err);
    };
}

