const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

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
            true
        ]
    }

}, { timestamps: true });

ingredientSchema.plugin(uniqueValidator, { message: "we already have this ingredient . . ."});
module.exports.ingredient = mongoose.model('ingredient', ingredientSchema);
