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

    function set(filepath, key, root) {
        var files = glob.sync(filepath);
        files.forEach(function (file) {
            var filename = path.basename(file, path.extname(file));
            var filepath = path.join(cwd, file);
            if (key === '_root') {
                target[filename] = require(filepath);
                return;
            }
            keypath.set(target, root ? key : key + '[\'' + filename + '\']', require(filepath));
        });
    }

    Object.keys(descriptor).forEach(function (key) {
        var filepath = descriptor[key];
        if (typeof filepath === 'string') {
            return set(filepath, key, key === '_root');
        }
        var root = filepath._root;
        if (root) {
            set(root, key, true);
        }
        var children = filepath._children;
        if (children) {
            set(children, key, false);
        }
    });

    return target;
}

module.exports = lmao;


