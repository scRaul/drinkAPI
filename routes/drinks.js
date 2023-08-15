const express = require('express');
const controller = require("../controllers/testController");
const router = express.Router(); 

// CREATE 
router.post('add',controller.addADrink);
// READ
router.get('all',controller.getAllDrinks);
router.get(':drinkId',controller.getDrinkById);

//UPDATE 
router.patch(':drinkId',controller.updateDrink);

// DELETE 
router.delete(':drinkId',controller.deleteDrink);


module.exports = router; 