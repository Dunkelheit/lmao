'use strict';

var lmao = require('../index');
var inspect = require('util').inspect;

var api = lmao.loadSync({
    client: {
        _: 'example/client/*.js',
        provider: 'example/client/provider/*.js'
    },
    static: 'example/public/**/*.json',
    service: 'example/service/*.js',
    transformation: 'example/transformation/*.js'
});

console.log(inspect(api, { depth: null, colors: true }));
