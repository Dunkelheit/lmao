'use strict';

var lmao = require('../index');

var api = module.exports = {
    version: '0.1.0'
};

lmao(api, {
    _root: 'example/util.js', // Root level modules
    client: 'example/client/*.js',
    'client.sap': {
        _root: 'example/client/sap/index.js',
        _children: 'example/client/sap/modules/*.js'
    },
    'client.netsuite': {
        _root: 'example/client/netsuite/index.js',
        _children: 'example/client/netsuite/modules/*.js'
    },
    static: 'example/public/**/*.json',
    transformation: 'example/transformation/*.js',
    service: 'example/service/*.js'
});