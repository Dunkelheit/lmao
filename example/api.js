'use strict';

var lmao = require('../lib/lmao');
var inspect = require('util').inspect;

lmao.load({
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

