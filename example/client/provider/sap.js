'use strict';

var api = require('../../api');

module.exports = {
    search: function () {
        return api.client.rest({
            id: 1,
            name: 'A search result'
        });
    },
    details: function () {
        return api.client.soap({
            id: 1,
            name: 'Document details'
        });
    }
};