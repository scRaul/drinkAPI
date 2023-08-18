const fs = require("fs");
const path = require("path");

const drink = require("../models/drink");
const Drink = require("../models/drink");
const { fileURLToPath } = require("url");
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
    const drinkName = req.params.drinkName;
    const description = req.body.description;
    const ingrediantList = req.body.ingrediantList;
    let imageUrl = req.body.image;
    var fileUploaded = false;
    if ( req.file ){
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
                clearImage(drink.imageUrl);
            }
            drink.name = drinkName;
            drink.description = description;
            drink.ingrediantList = ingrediantList;
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
    res.status(200).json({
        deleteDrink: {name: "deletedDrink",description:"thisDrink"}
    });
}

const clearImage = filePath =>{
    filePath = path.join(__dirname,'..',filePath);
    fs.unlink(filepath,err => console.log(err));
}