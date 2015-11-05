'use strict';

var lmao = require('../lib/lmao');
var inspect = require('util').inspect;

var api = {
    version: '0.1.0',
    log: console.log
};

lmao.load(api, {
    client: {
        _: 'example/client/*.js',
        provider: 'example/client/provider/*.js'
    },
    static: 'example/public/**/*.json',
    service: 'example/service/*.js',
    transformation: 'example/transformation/*.js'
}, function (err, api) {
    console.log(inspect(api, { depth: null, colors: true }));
});

