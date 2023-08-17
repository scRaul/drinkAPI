const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    ingrediantList: {
        type: Array,
        requried:true
    }
}) ;

module.exports = mongoose.model("Drink",drinkSchema);