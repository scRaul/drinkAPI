const express = require('express');
const auth = require('../middleware/auth');
const controller = require("../controllers/adminController");
const router = express.Router(); 
const {validateDrink} = require('../middleware/drinkValidation');


router.post('/login', controller.login);
// CREATE 
router.post('/add',auth,validateDrink,controller.addADrink);
//UPDATE 
router.put('/:drinkName',auth,validateDrink,controller.updateDrink);
// DELETE 
router.delete('/:drinkName',auth,validateDrink,controller.deleteDrink);


module.exports = router; 