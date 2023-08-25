const {body,validationResult} = require('express-validator');
const fs = require("fs");
const path = require("path");
const {removeImage} = require('../middleware/imageHandler');


exports.validateDrink = [
    body('name').isLength({min: 3}),
    body('price').isFloat({min: 0.00}),
    body('ingredientList').isArray({min:0}),
    body('description').notEmpty(),
    (req,res,next) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){

            if( res.locals.path ){
                removeImage(res.locals.path);
            }
            const error = new Error('drink schema validation failed');
            error.statusCode = 422;
            throw error;
        }
        console.log('drink validated');
        next();
    }
];
