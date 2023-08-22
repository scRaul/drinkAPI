const {body,validationResult} = require('express-validator');
const fs = require("fs");
const path = require("path");


exports.validateDrink = [
    body('name').isLength({min: 3}),
    body('price').isFloat({min: 0.00}),
    body('ingredientList').isArray({min:0}),
    body('description').notEmpty(),
    (req,res,next) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){

            if( req.file.path ){
                clearImage(req.file.path);
            }
            const error = new Error('drink schema validation failed');
            error.statusCode = 422;
            throw error;
        }
        next();
    }
];

const clearImage = filePath =>{
    filePath = path.join(__dirname,'..',filePath);
    fs.unlink(filePath,err => console.log(err));
}