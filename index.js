'use strict';

var glob = require('glob');
var keypath = require('keypather')();
var path = require('path');

var cwd = process.cwd();

function lmao(target, descriptor) {
    if (!descriptor) {
        descriptor = target;
        target = {};
    }

    Object.keys(descriptor).forEach(function (key) {
        var filepath = descriptor[key];
        var files = glob.sync(filepath);
        files.forEach(function (file) {
            var filename = path.basename(file, path.extname(file));
            var filepath = path.join(cwd, file);
            if (key === '_') {
                target[filename] = require(filepath);
                return;
            }
            keypath.set(target, key + '[\'' + filename + '\']', require(filepath));
        });
    });

    return target;
}

module.exports = lmao;


