'use strict';

var api = require('../api');

module.exports = {
    search: function () {
        var result = api.client.netsuite.stores.search();
        return api.transformation.store.transformStoreList(result);
    },
    details: function () {
        var result = api.client.netsuite.stores.details();
        return api.transformation.store.transformStoreDetails(result);
    }
};