const express = require('express');
const {auth,verify} = require('../middleware/auth');
const testEnd = require('../middleware/testEnd')
const controller = require("../controllers/adminController");
const router = express.Router(); 
const {validateDrink} = require('../middleware/drinkValidation');
const {localUpload,fireabaseUpload, memUpload} = require('../middleware/imageHandler');


router.post('/login', controller.login);
router.post('/verify-token',verify);
router.use(auth);
// DELETE 
router.delete('/:drinkName',controller.deleteDrink);
// CREATE 
router.use(fireabaseUpload);
router.post('/add',validateDrink,controller.addADrink);
//UPDATE 
router.put('/:drinkName',validateDrink,controller.updateDrink);


module.exports = router; 