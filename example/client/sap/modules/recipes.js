'use strict';

var api = require('../../../api');

module.exports = {
    search: function () {
        return api.client.sap.request([{
            id: 1,
            name: 'Pizza'
        }]);
    },
    details: function () {
        return api.client.sap.request({
            id: 1,
            name: 'Pizza',
            description: 'Everybody loves pizza!'
        });
    }
};