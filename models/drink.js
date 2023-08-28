const { getDatabase, ref, child, set } = require("firebase/database");
const {findOne} = require('../util/rtdb');
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
    static async findOne(drinkName){
        try{
            let snapshot = await findOne('drinks',drinkName);
             if(snapshot instanceof Error){return snapshot;}
            return new Drink(snapshot.name,snapshot.price,snapshot.description,snapshot.imagePath,snapshot.downloadURL,snapshot.ingredientList);
        }catch(error){
            return new Error("Cant connect to DB");
        }
    }
    static async findAll(){
        try{
            let snapshot = await findOne('drinks','');
             if(snapshot instanceof Error){return snapshot;}
             else{
                let array = [];
                snapshot.forEach(el  => {
                    let drink = new Drink(el.name,el.price,el.description,el.imagePath,el.downloadURL,el.ingredientList);
                    array.push(drink)
                });
                return array;
             }
        }catch(error){
            return new Error("Cant connect to DB");
        }
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
