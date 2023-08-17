exports.addADrink = (req,res,next ) =>{
    res.status(200).json({
        newDrink: {name: "new drink",description:"this is new"}
    });
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
        thisDrink: {name: "thisDrink",description:"thisDrink"}
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