'use strict';

var glob = require('glob');
var path = require('path');

var cwd = process.cwd();

// https://gist.github.com/gabrieleds/dc38c958ee74481f7a12
function series (fns, done) {
    while (fns.length) {
      done = fns.pop().bind(null, done);
    }
    done();
}

function iterate(items, fn) {
    var keys = Object.keys(items);
    keys.forEach(function (key) {
        var val = items[key];
        if ('string' !== typeof val) {
          return iterate(val, fn);
        }
        fn(key, val, items);
    });
}

function clone(object) {
    return JSON.parse(JSON.stringify(object));
}

function lmao(target, tree) {
    var loaders = [];
    var args = arguments;
    var argsLen = args.length;
    var callback = args[argsLen - 1];
    var isSync = 'function' !== typeof callback;
    if (argsLen === (isSync ? 1 : 2)) {
        tree = target;
        target = {};
    }
    if ('string' === typeof tree) {
        tree = {
          _: tree
        };
    }

    var result = clone(tree);

    iterate(result, function (key, val, items) {
        function set(name, data) {
            if ('_' === key) {
                delete items[key]; // TODO: Improve this
                items[name] = data;
            } else {
                items[key][name] = data;
            }
        }
        loaders.push(function (next) {
            function done(err, files) {
                if (err) {
                  return next(err);
                }
                items[key] = {};
                files.forEach(function (file) {
                    var filename = path.basename(file, path.extname(file));
                    set(filename, require(path.join(cwd, file)));
                });
                next();
            }
            if (isSync) {
              return done(null, glob.sync(val));
            }
            glob(val, done);
        });
    });

    series(loaders, function () {
        Object.assign(target, result);
        if (!isSync) {
          callback(null, target);
        }
    });

    if (isSync) {
      return target;
    }
}
lmao.load = lmao.loadSync = lmao; // Backward compatibility

module.exports = lmao;


