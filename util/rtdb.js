const { getDatabase, ref,child,get } = require('firebase/database');

exports.findOne = async (path,data) =>{
    const dbRef = ref(getDatabase());
    try{
        let snapshot = await get(child(dbRef, `${path}/${data}`));
        if(snapshot.exists()){
            return snapshot.val();
        }else{
            const error =  new Error('rec not found');
            error.statusCode = 500;
            throw error;
        }
    }catch(error){
        return error;
    }
}