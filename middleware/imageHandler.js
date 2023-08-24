const multer = require('multer');
//functions for file uploads using multer 
const fileStorage = multer.diskStorage({
    destination : ( req, file, cb) => {
       cb(null, 'images');
    },
    filename : (req,file,cb) => {
       cb(null,new Date().toISOString() + '-' + file.originalname);
    }
 });
const fileFilter = (req,file,cb) => {
    if ( file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' ||
    file.mimetype == 'image/heic'){
       cb(null,true);
    }else{
       cb(null,false);
    }
 }

 exports.localUpload = multer({storage: fileStorage, fileFilter: fileFilter}).single('image');