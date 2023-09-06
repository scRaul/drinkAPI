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
    console.log('firebase upload')
    const storage = getStorage();
    if(typeof req.files == 'undefined'){
        const error = new Error('No image provided');
        error.status = 422;
        throw error;
    }
    const {
        fieldname,
        originalname,
        encoding,
        mimetype,
        buffer,
      } = req.files[0];
    if(mimetype != 'image/heic' && mimetype != 'image/jpeg'){
        const error = new Error('Wrong format');
        error.status = 422;
        throw error;
    }
    const imageUrl = new Date().toISOString() +'-' + originalname;
    const imageRef = ref(storage,`images/${imageUrl}`);
    const metadata = {
        contentType: mimetype
    };
    uploadBytes(imageRef,buffer,metadata).then( (snapshot)=>{
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