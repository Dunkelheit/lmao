'use strict';

var api = require('../../api');

module.exports = {
    request: function (echo) {
        return api.client.rest(echo);
    },
    options: {
        remoteUri: 'http://my-netsuite.com/my-api'
    }
};