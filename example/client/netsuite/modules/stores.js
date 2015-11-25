'use strict';

var api = require('../../../api');

module.exports = {
    search: function () {
        return api.client.netsuite.request([{
            id: 1,
            name: 'Main Store'
        }]);
    },
    details: function () {
        return api.client.netsuite.request({
            id: 1,
            name: 'Main Store',
            description: 'This is our flagship store'
        });
    }
};