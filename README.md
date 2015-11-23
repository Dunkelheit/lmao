# lmao

`lmao` (load modules in an object) is some kind of a bootloader that can be used when you have a large object tree meant
to expose different features of, let's say, an API.

Imagine you have a folder with the following structure. In the subfolders you have some JavaScript modules and JSON
files.

```
.__ client/
|  |__ provider/
|  |  |__ sap.js
|  |__ rest.js
|  |__ soap.js
|__ public/
|  |__ json
|     |__ disclaimer.json
|     |__ privacy.json
|__ service/
|  |__ product.js
|  |__ recipe.js
|  |__ store.js
|__ transformation/
   |__ product.js
   |__ recipe.js
   |__ store.js
```

With `lmao` you can load all those JavaScript and JSON files directly into an object with a specific structure. The
values of the structure descriptor are [glob](https://www.npmjs.com/package/glob) paths.
 
```javascript
var lmao = require('lmao');

lmao({
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

//
// The console.log would output:
//
{
    client: {
        provider: {
            sap: {
                search: [Function],
                details: [Function]
            }
        },
        rest: [Function: rest],
        soap: [Function: soap]
    },
    static: {
        disclaimer: {
            title: 'Disclaimer',
            descripton: 'Lorem ipsum dolor sit amet'
        },
        privacy: {
            title: 'Privacy',
            descripton: 'Lorem ipsum dolor sit amet'
        }
    },
    service: {
        product: {
            search: [Function],
            details: [Function]
        },
        recipe: {
            search: [Function],
            details: [Function]
        },
        store: {
            search: [Function],
            details: [Function]
        }
    },
    transformation: {
        product: {
            transformProductList: [Function],
            transformProductDetails: [Function]
        },
        recipe: {
            transformRecipeList: [Function],
            transformRecipeDetails: [Function]
        },
        store: {
            transformStoreList: [Function],
            transformStoreDetails: [Function]
        }
    }
}
```

Now you can start using your API!

```
api.service.product.search(...);
api.service.recipe.transformRecipList(...);
api.client.rest(...);
```

## Installation

You can install `lmao` with `npm`:

```
npm install lmao
```

## Usage

You can see some examples in the [example](example) folder.

### lmao([target,] tree[, callback])

Loads the modules described in the `tree` structure, optionally merging them into the `target` object. If the function
is used synchronously (see arguments) then the loaded modules will be returned by this function.

**Arguments**

* `target` - An optional object you might want to extend with the loaded modules
* `tree` - An object or a string
    * Object - Descriptor of the resulting object structure. The values of each property are `glob` paths. If you use an underscore (`_`) as the property name, then the modules will be loaded into the root of the parent property.
    * String - A `glob` path of files to load
* `callback(err, tree)` - An optional callback function, where `tree` is the object with all modules loaded
    * If `callback` is present, `lmao` will perform its tasks **asynchronosly**, and the loaded modules will be part of the callback function
    * If `callback` is not present, `lmao` will perform its tasks **synchronously**, and the loaded modules will be returned

**Examples**

Builds an object loaded with modules in a specific structure. 

```javascript
lmao({
    client: 'lib/client/**/*.js',
    service: 'lib/service/**/*.js', 
    transformation: 'lib/transformation/**/*.js',
    data: {
        _: 'lib/data/main.js',
        js: 'lib/data/js/*.js',
        json: 'lib/data/js/*.json'
    }
}, function (err, tree) {
    console.log(tree);
});
```

Loads all `.js` files under the path `lib/client` as properties in an object.

```javascript
lmao.load('lib/client/**/*.js', function (err, modules) {
    console.log(tree);
});
```

Using `lmao` synchronously.

```javascript
var tree = lmao({
    client: 'lib/client/**/*.js',
    service: 'lib/service/**/*.js', 
    transformation: 'lib/transformation/**/*.js',
    data: {
        _: 'lib/data/main.js',
        js: 'lib/data/js/*.js',
        json: 'lib/data/js/*.json'
    }
}
```

Another synchronous example.

```javascript
var api = lmao.load('lib/client/**/*.js');
```

## Development

* Linting: `gulp lint`
* Testing and coverage: `gulp test`
* Generate JSDoc files: `gulp jsdoc`

## License

[MIT](LICENSE)

## Ayy?

Lmao