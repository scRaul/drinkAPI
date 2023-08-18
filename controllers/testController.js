const Drink = require("../models/drink");
exports.addADrink = (req,res,next ) =>{
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
            next();
        })
  
}

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