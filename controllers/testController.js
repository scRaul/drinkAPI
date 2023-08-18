const Drink = require("../models/drink");
exports.addADrink = (req,res,next ) =>{
    if(!req.file){
        res.json({nada:req.file});
        next();
    }
    const name = req.body.name;
    const ingrediantList = req.body.ingrediantList; 
    const description = req.body.description;
    const imageUrl = req.file.path;

    const drink = new Drink({
        name: name,
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
        })
  
}

exports.getAllDrinks = (req,res,next) => {
    res.status(200).json({
        drinks : [ 
        {name: "apple juice", description: "juice made from apples"},
        {name: "old fashioned", description: "OG cocktail"},
        {name: "Margarita", description: "sweet alcoholic beverage"},
        {name: "Martini", description: "007"}
        ]
    });
}

exports.getDrinkByName = (req,res,next) => {
    const drinkName = req.params.drinkName;
    console.log(drinkName);
    Drink.findOne({'name':drinkName})
    .then(drink =>{
        if(!drink){
            throw new Error('not found!');
        }
        res.status(200).json({
            message:"drink found",
            drink: drink
        })
    })
    .catch(err =>{
        console.log(err);
        next();
    });
}

exports.updateDrink = (req,res,next) =>{
    res.status(200).json({
        updateDrink: {name: "thisDrink",description:"updatedDrink"}
    });
}
exports.deleteDrink = (req,res,next) =>{
    res.status(200).json({
        deleteDrink: {name: "deletedDrink",description:"thisDrink"}
    });
}