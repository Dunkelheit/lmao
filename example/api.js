'use strict';

var lmao = require('../index');

var api = module.exports = {
    version: '0.1.0',
    log: console.log
};

lmao(api, {
    client: {
        _: 'example/client/*.js',
        provider: 'example/client/provider/*.js'
    },
    static: 'example/public/**/*.json',
    transformation: 'example/transformation/*.js',
    service: 'example/service/*.js'
});
