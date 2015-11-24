'use strict';

var api = require('./api');
var util = require('util');

function inspect(v) {
    return util.inspect(v, { depth: null, colors: true });
}

api.log(inspect(api));

var result = api.service.product.search();

console.log('We found an item!', inspect(result));