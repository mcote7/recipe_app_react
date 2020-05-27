const ingredientController = require('../controllers/ingredient.controller');

module.exports = function(app) {
    app.get('api/ingredients', ingredientController.allIngredients);
    app.post('api/ingredient/create', ingredientController.addIngredient);
    app.delete('api/ingredient/delete/:id', ingredientController.deleteOneIngredient);
    app.delete('api/ingredients/deleteall', ingredientController.deleteAllIngredients);
}

