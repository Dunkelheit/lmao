'use strict';

var api = require('../../api');

module.exports = {
    request: function (echo) {
        return api.client.soap(echo);
    },
    options: {
        remoteUri: 'http://my-sap.com/my-api'
    }
};