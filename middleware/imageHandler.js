const multer = require('multer');
const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');

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

 exports.memUpload = multer({storage: multer.memoryStorage(), fileFilter: fileFilter}).single('image');
 exports.fireabaseUpload = (req,res,next) =>{
    const storage = getStorage();
    if(!req.file){
        const error = new Error('No image provided');
        error.status = 422;
        throw error;
    }
    const imageUrl = new Date().toISOString() +'-' + req.file.originalname;
    const imageRef = ref(storage,`images/${imageUrl}`);
    const metadata = {
        contentType: req.file.mimetype
    };
    uploadBytes(imageRef,req.file.buffer,metadata).then( (snapshot)=>{
        getDownloadURL(snapshot.ref).then((downloadURL) =>{
            res.locals.downloadURL = downloadURL;
            res.locals.path = `images/${imageUrl}`;
            next();
        }).catch(err =>{
            const error = new Error('unable to get snapshot');
            error.statusCode = 500;
            next(err);
        });
    }).catch(err=>{
        const error = new Error('unable to upload image');
        error.statusCode = 500;
        next(err);
    });
 }
 

 exports.removeImage = (imagePath) => {
    const storage = getStorage();

    const desertRef = ref(storage, imagePath);
    deleteObject(desertRef).then(() => {
        console.log('file delted sucessfully');
      }).catch((error) => { 
            console.log('unable to delete file');
      });
      
 }