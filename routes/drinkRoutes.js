const express = require('express');
const controller = require("../controllers/testController");
const router = express.Router(); 

// CREATE 
router.post('/add',controller.addADrink);
// READ
router.get('',controller.getAllDrinks);
router.get('/:drinkName',controller.getDrinkByName);

//UPDATE 
router.put('/:drinkName',controller.updateDrink);

// DELETE 
router.delete('/:drinkName',controller.deleteDrink);


module.exports = router; 