const {body,validationResult} = require('express-validator');
const fs = require("fs");
const path = require("path");
const {removeImage} = require('../middleware/imageHandler');


exports.validateDrink = [
    body('name').isLength({min: 3}),
    body('price').isFloat({min: 0.00}),
    body('ingredientList').custom( (value) =>{
        const list = value.split(',');
        if( list.length == 0) {
            throw new Error('Need at least 1 or more ingredients');
        }
        return true;
    }).withMessage('invalid list'),
    body('description').notEmpty(),
    (req,res,next) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            console.log('Request Body:', req.body);
            if( res.locals.path ){
                removeImage(res.locals.path);
            }
            const error = new Error('Validation Failed');
            error.statusCode = 422;
            error.errors = errors.array();
            throw error;
        }
        req.body.ingredientList = req.body.ingredientList.split(',');
        console.log('drink validated');
        next();
    }
];
