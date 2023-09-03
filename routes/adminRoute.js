const express = require('express');
const auth = require('../middleware/auth');
const controller = require("../controllers/adminController");
const router = express.Router(); 
const {validateDrink} = require('../middleware/drinkValidation');
const {localUpload,fireabaseUpload, memUpload} = require('../middleware/imageHandler');



router.post('/login', controller.login);
// DELETE 
router.delete('/:drinkName',auth,controller.deleteDrink);
// CREATE 
router.use(auth,fireabaseUpload);
router.post('/add',auth,validateDrink,controller.addADrink);
//UPDATE 
router.put('/:drinkName',auth,validateDrink,controller.updateDrink);


module.exports = router; 