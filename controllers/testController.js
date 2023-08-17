const Drink = require("../models/drink");
exports.addADrink = (req,res,next ) =>{
    const name = req.body.name;
    const ingrediantList = req.body.ingrediantList; 
    const description = req.body.description;
    const imageUrl = '../images/martini.jpg';

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

exports.getDrinkById = (req,res,next) => {
    res.status(200).json({
        thisDrink: {name: "thisDrink",description:"thisDrink", imageURL:"../images/martini.jpg"}
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