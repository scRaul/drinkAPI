const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.get('Authorization');
    let decodedToken;

    try {
        decodedToken = jwt.verify(token,'supersecretkey');
    }catch(err ){
        throw err; 
    }
    if ( !decodedToken ){
        throw new Error('Not authenticated');
    }
    req.admin = decodedToken.admin;
    next();
};