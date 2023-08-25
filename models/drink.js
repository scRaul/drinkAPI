const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    ingredientList: {
        type: Array,
        requried:true
    },
    downloadURL:{
        type: String,
        required: true

    }
}) ;

module.exports = mongoose.model("Drink",drinkSchema);