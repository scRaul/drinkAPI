const { getDatabase, ref,child,get } = require('firebase/database');
module.exports = class Admin {

    constructor(username,password){
        this.username = username;
        this.password = password;
    }
    static async findOne(user){
        const dbRef = ref(getDatabase());
        try{
            let snapshot = await get(child(dbRef, `users/${user}`));
            if(snapshot.exists()){
                return new Admin(snapshot.val().username,snapshot.val().password);
            }else{
                return null;
            }
        }catch(error){
            console.log('unable to connect to RTDB');
            return new Error("Cant connect to DB");
        }
    }
}