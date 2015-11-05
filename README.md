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

### lmao.load([target,] tree, callback)

Loads the modules described in the `tree` structure, optionally merging them into the `target` object.

**Arguments**

* `target` - An optional object you might want to extend with the loaded modules
* `tree` - An object describing the resulting object structure. The values of each property are `glob` paths. If you 
use an underscore (`_`) as the property name, then the modules will be loaded into the root of the parent property.
* `callback(err, tree)` - The usual callback function, where `tree` is the object with all modules loaded

**Example**

```javascript
lmao.load({
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

### lmao.loadSync([target,] tree)

Synchronous version of `lmao.load`. Returns a object with all modules loaded.

**Example**

```javascript
var tree = lmao.loadSync({
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

## Development

* Linting: `gulp lint`
* Testing and coverage: `gulp test`
* Generate JSDoc files: `gulp jsdoc`
