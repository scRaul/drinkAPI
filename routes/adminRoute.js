const express = require('express');
const auth = requrie('../middleware/auth');
const controller = require("../controllers/adminController");
const router = express.Router(); 


router.post('/login', controller.login);
// CREATE 
router.post('/add',auth,controller.addADrink);
//UPDATE 
router.put('/:drinkName',auth,controller.updateDrink);
// DELETE 
router.delete('/:drinkName',auth,controller.deleteDrink);


module.exports = router; 