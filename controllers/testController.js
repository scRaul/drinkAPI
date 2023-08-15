exports.addADrink = (req,res,next ) =>{
    console.log("added a new drink");
}

exports.getAllDrinks = (req,res,next) => {
    console.log("obtaining a list of all drinks");
}

exports.getDrinkById = (req,res,next) => {
    console.log("fetching a drink by Id");
}

exports.updateDrink = (req,res,next) =>{
    console.log("Updated a drinks");
}
exports.deleteDrink = (req,res,next) =>{
    console.log("Deleting a drink"); 
}