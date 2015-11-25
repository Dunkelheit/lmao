'use strict';

var api = require('../api');

module.exports = {
    search: function () {
        var result = api.client.sap.recipes.search();
        return api.transformation.recipe.transformRecipeList(result);
    },
    details: function () {
        var result = api.client.sap.recipes.details();
        return api.transformation.recipe.transformRecipeDetails(result);
    }
};