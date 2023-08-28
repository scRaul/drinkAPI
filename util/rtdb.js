const { getDatabase, ref,child,get } = require('firebase/database');

exports.findOne = async (path,data) =>{
    const dbRef = ref(getDatabase());
    try{
        let snapshot = await get(child(dbRef, `${path}/${data}`));
        if(snapshot.exists()){
            return snapshot.val();
        }else{
            return null;
        }
    }catch(error){
        console.log('unable to connect to RTDB');
        return new Error("Cant connect to DB");
    }
}