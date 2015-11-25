'use strict';

var api = require('./api');
var util = require('util');

function inspect(v) {
    return util.inspect(v, { depth: null, colors: true });
}

api.util.log('API has been loaded:', inspect(api));

var productList = api.service.product.search();
api.util.log('Product list:', inspect(productList));

var productDetails = api.service.product.details();
api.util.log('Product details:', inspect(productDetails));

var recipeList = api.service.recipe.search();
api.util.log('Recipe list:', inspect(recipeList));

var recipeDetails = api.service.recipe.details();
api.util.log('Recipe details:', inspect(recipeDetails));

var storeList = api.service.store.search();
api.util.log('Store list:', inspect(storeList));

var storeDetails = api.service.store.details();
api.util.log('Store details:', inspect(storeDetails));
