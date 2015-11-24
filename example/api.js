'use strict';

var lmao = require('../index');

var api = module.exports = {
    version: '0.1.0'
};

lmao(api, {
    _: 'example/util.js', // Root level modules
    client: 'example/client/*.js',
    'client.provider': 'example/client/provider/*.js',
    static: 'example/public/**/*.json',
    transformation: 'example/transformation/*.js',
    service: 'example/service/*.js'
});