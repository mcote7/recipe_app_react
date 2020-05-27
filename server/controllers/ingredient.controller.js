const { ingredient } = require('../models/ingredient.model');

module.exports.allIngredients = (req, res) => {
    ingredient.find({})
        .then(allIngredients => res.json(allIngredients))
        .catch(err => res.json({ message: "Something went wrong . . .", error: err }));
    }

module.exports.addIngredient = (req, res) => {
    const { name } = req.body;
    ingredient.create({
        name
    })
        .then(ingredient => res.json({ ingredient: ingredient }))
        .catch(err => res.status(400).json(err));
    }

module.exports.deleteOneIngredient = (req, res) => {
    ingredient.deleteOne({ _id: req.params.id })
        .then(deleteConfirmation => res.json(deleteConfirmation))
        .catch(err => res.json(err))
    }

module.exports.deleteAllIngredients = (req,res) => {
    ingredient.remove()
    .then(deleteConfirmation => res.json(deleteConfirmation))
    .catch(err => res.json(err));
}


