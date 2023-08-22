const {body,validationResult} = require('express-validator');

exports.validateDrink = [
    body('name').isLength({min: 3}),
    body('price').isFloat({min: 0.00}),
    body('ingredientList').isArray({min:0}),
    body('description').notEmpty(),
    (req,res,next) =>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});
        }
        next();
    }
];