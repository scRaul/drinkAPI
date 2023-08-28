//const { getDatabase, ref,child,get } = require('firebase/database');
const {findOne } = require('../util/rtdb');
module.exports = class Admin {

    constructor(username,password){
        this.username = username;
        this.password = password;
    }
    static async findOne(user){
        try{
            let snapshot = await findOne('users',user);
            return new Admin(snapshot.username,snapshot.password);
        }catch(error){
            console.log('unable to connect to RTDB');
            return new Error("Cant connect to DB");
        }
    }
}