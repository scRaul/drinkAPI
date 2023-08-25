const express = require('express');
const auth = require('../middleware/auth');
const controller = require("../controllers/adminController");
const router = express.Router(); 
const {validateDrink} = require('../middleware/drinkValidation');
const {localUpload,fireabaseUpload, memUpload} = require('../middleware/imageHandler');



router.post('/login', controller.login);
// CREATE 
router.use(auth,memUpload,fireabaseUpload);
router.post('/add',auth,validateDrink,controller.addADrink);
//UPDATE 
router.put('/:drinkName',auth,validateDrink,controller.updateDrink);
// DELETE 
router.delete('/:drinkName',auth,controller.deleteDrink);


module.exports = router; 