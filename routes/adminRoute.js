const express = require('express');
const {auth} = require('../middleware/auth');
const testEnd = require('../middleware/testEnd')
const controller = require("../controllers/adminController");
const router = express.Router(); 
const {validateDrink} = require('../middleware/drinkValidation');
const {localUpload,fireabaseUpload, memUpload} = require('../middleware/imageHandler');


router.options('/login', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Adjust the origin as needed
    res.setHeader('Access-Control-Allow-Methods', 'POST,  OPTIONS'); // Include the relevant HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Include the relevant headers
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // If you need to send cookies
    res.status(200).end(); // Respond with HTTP OK
  });
router.post('/login', controller.login);

router.use(auth);
// DELETE 
router.delete('/:drinkName',controller.deleteDrink);
// CREATE 
router.use(fireabaseUpload);
router.post('/add',validateDrink,controller.addADrink);
//UPDATE 
router.put('/:drinkName',validateDrink,controller.updateDrink);


module.exports = router; 