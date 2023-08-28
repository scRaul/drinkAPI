const { getDatabase, ref, remove, set } = require("firebase/database");
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
            return snapshot;
            //  if(snapshot instanceof Error){return snapshot;}
            // return new Drink(snapshot.name,snapshot.price,snapshot.description,snapshot.imagePath,snapshot.downloadURL,snapshot.ingredientList);
        }catch(error){
            return new Error("Cant connect to DB");
        }
    }
    static async findAll(){
        try{
            let snapshot = await findOne('drinks','');
             return snapshot;
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
    static remove(drink,cb){
        const db = getDatabase();
        remove(ref(db,`drinks/${drink}`)).then((result,error)=>{
            cb(true,null);
        }).catch(err =>{
            cb(null,true);
        });
    }
};
