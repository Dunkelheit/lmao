'use strict';

var api = require('../api');

module.exports = {
    search: function () {
        var result = api.client.sap.products.search();
        return api.transformation.product.transformProductList(result);
    },
    details: function () {
        var result = api.client.sap.products.details();
        return api.transformation.product.transformProductDetails(result);
    }
};