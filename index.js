'use strict';

var glob = require('glob');
var path = require('path');

var cwd = process.cwd();

function iterate(items, callback) {
    var keys = Object.keys(items);
    keys.forEach(function (key) {
        var val = items[key];
        if (typeof val !== 'string') {
            return iterate(val, callback);
        }
        callback(key, val, items);
    });
}

function lmao(target, descriptor) {
    if (!descriptor) {
        descriptor = target;
        target = {};
    }

    if (typeof descriptor === 'string') {
        descriptor = {
            _: descriptor
        };
    }

    iterate(descriptor, function (key, val, items) {
        var files = glob.sync(val);
        items[key] = {};
        files.forEach(function (file) {
            var filename = path.basename(file, path.extname(file));
            var filepath = path.join(cwd, file);
            if (key === '_') {
                delete items[key];
                items[filename] = require(filepath);
            } else {
                items[key][filename] = require(filepath);
            }
        });

    });

    Object.assign(target, descriptor);

    return target;
}

module.exports = lmao;


