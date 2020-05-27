const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({

    name: {
        type: String,
        minlength: [
            2,
            "ingredient must be at least 2 letters long . . ."
        ],
        required: [
            true,
            "ingredient is required . . ."
        ],
        unique: [
            true,
            "you already have this ingredient . . ."
        ]
    }

}, { timestamps: true });

module.exports.ingredient = mongoose.model('ingredient', ingredientSchema);
