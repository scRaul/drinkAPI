module.exports = class Drink {
    #drinkID;
    #drinkName;
    #ingrediants; 
    #description; 
    #imageURL;
    constructor(drinkId, drinkName){
        this.#drinkID = drinkId; 
        this.#drinkName = drinkName; 
        this.#ingrediants = []; 
        this.#description = "";
        this.#imageURL = ""; 
    }

    addIngrediant(ingrediant){
        this.#ingrediants.push(ingrediant); 
    }

    setDescription(description){
        this.#description = description; 
    }

    setImageUrl(imageURL){
        this.#imageURL = imageURL; 
    }
}