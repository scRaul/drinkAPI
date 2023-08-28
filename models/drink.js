const { getDatabase, ref, child, set } = require("firebase/database");
module.exports = class Drink {
    static path = 'drinks/';
    constructor(name,price,description,imagePath,downloadURL,ingredientList){
        this.name = name;
        this.price = price;
        this.description=description;
        this.imagePath=imagePath;
        this.downloadURL=downloadURL;
        this.ingredientList=ingredientList;
    }
    self(){
        return {
            name:this.name,
            price:this.price,
            description:this.description,
            imagePath:this.imagePath,
            downloadURL:this.downloadURL,
            ingredientList:this.ingredientList
        };
    }
    save(cb) {
        const db = getDatabase();
        set(ref(db, `${Drink.path}${this.name}`),this.self()).then((result,error)=>{
            cb(true,null);
        }).catch(err =>{
            cb(null,true);
        });
    }
};
