'use strict';

var api = require('../api');

module.exports = {
    search: function () {
        var result = api.client.provider.sap.search();
        return api.transformation.product.transformProductList(result);
    },
    details: function () {
        return api.client.provider.sap.details();
    }
};