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
exports.verify = (req,res) =>{
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
    try {
      const decodedToken = jwt.verify(token, process.env.SUPER_SECRET);
      return res.status(200).json({ message: 'Token is valid' });
    } catch (error) {
      return res.status(401).json({ message: 'Token is invalid' });
    }
};