'use strict';

var async = require('async');
var glob = require('glob');
var path = require('path');

var lang = require('./lang');

var lmao = module.exports = {};

function requireFiles(item, key, files, cwd) {
    item[key] = {};
    files.forEach(function (file) {
        var filename = path.basename(file, path.extname(file));
        if (key === '_') {
            delete item[key]; // TODO: Improve this
            item[filename] = require(path.join(cwd, file));
        } else {
            item[key][filename] = require(path.join(cwd, file));
        }
    });
}

lmao.load = function load(target, tree, callback) {
    if (!callback) {
        callback = tree;
        tree = target;
        target = {};
    }

    var result = lang.clone(tree);
    var cwd = process.cwd();

    var moduleLoaders = [];
    lang.iterate(result, function (item, key) {
        moduleLoaders.push(function (next) {
            glob(item[key], function (err, files) {
                if (err) {
                    return next(err);
                }
                requireFiles(item, key, files, cwd);
                next();
            });
        });
    });

    async.series(moduleLoaders, function (err) {
        if (err) {
            return callback(err);
        }
        lang.assign(target, result);
        callback(null, target);
    });
};

lmao.loadSync = function loadSync(target, tree) {
    if (!tree) {
        tree = target;
        target = {};
    }

    var result = lang.clone(tree);
    var cwd = process.cwd();

    lang.iterate(result, function (item, key) {
        var files = glob.sync(item[key]);
        requireFiles(item, key, files, cwd);
    });

    lang.assign(target, result);
    return target;
};
