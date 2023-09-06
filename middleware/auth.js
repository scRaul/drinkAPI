require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.auth  = (req,res,next) => {
    console.log('authorization endpoint')
    const token = req.get('Authorization');
    let decodedToken;

    try {
        decodedToken = jwt.verify(token,process.env.SUPER_SECRET);
    }catch(err ){
        throw err; 
    }
    if ( !decodedToken ){
        throw new Error('Not authenticated');
    }
    req.admin = decodedToken.admin;
    next();
};