'use strict';

var api = require('../../../api');

module.exports = {
    search: function () {
        return api.client.sap.request([{
            id: 1,
            name: 'Apples'
        }]);
    },
    details: function () {
        return api.client.sap.request({
            id: 1,
            name: 'Apples',
            description: 'Tasty apples'
        });
    }
};