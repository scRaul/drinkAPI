const express = require('express');
const controller = require("../controllers/readController");
const router = express.Router(); 


// READ
router.get('',controller.getAllDrinks);
router.get('/:drinkName',controller.getDrinkByName);


module.exports = router; 