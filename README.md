# lmao

`lmao` (load modules in an object) helps you load modules into an object with a specific structure. 

Imagine you have a project with the following structure:
```
.__ client/
|  |__ netsuite/
|  |  |__ modules/
|  |  |   |__ stores.js
|  |  |__ index.js
|  |__ sap/
|  |  |__ modules/
|  |  |   |__ products.js
|  |  |   |__ recipes.js
|  |  |__ index.js
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
|  |__ product.js
|  |__ recipe.js
|  |__ store.js
|__util.js
```

And now you want to:
* Import all these modules into a single object -we will call it "API" from now on-
* Have total control over the structure of the resulting API object
* Not worry to manually add, for instance, a new file you created inside `service/`
* Not worry about circular dependencies while loading all these modules

With `lmao` you can load all those modules directly into an object with a specific structure. `lmao` only needs what
we call a _descriptor_, which defines:
* The structure of the API object (using dot notation à la [keypather](http://npmjs.com/package/keypather))
* What files will be loaded (using [glob](https://www.npmjs.com/package/glob) path notation)

Example:
```javascript
var lmao = require('lmao');

var api = module.exports = {
    version: '0.1.0'
};

lmao(api, {
    _root: 'example/util.js', // Root level modules
    client: 'example/client/*.js',
    'client.sap': {
        _root: 'example/client/sap/index.js',
        _children: 'example/client/sap/modules/*.js'
    },
    'client.netsuite': {
        _root: 'example/client/netsuite/index.js',
        _children: 'example/client/netsuite/modules/*.js'
    },
    static: 'example/public/**/*.json',
    transformation: 'example/transformation/*.js',
    service: 'example/service/*.js'
});

//
// console.log output
//
 version: '0.1.0',
  util: { log: [Function: bound ] },
  client:
   { rest: [Function: rest],
     soap: [Function: soap],
     sap:
      { request: [Function],
        options: { remoteUri: 'http://my-sap.com/my-api' },
        products: { search: [Function], details: [Function] },
        recipes: { search: [Function], details: [Function] } },
     netsuite:
      { request: [Function],
        options: { remoteUri: 'http://my-netsuite.com/my-api' },
        stores: { search: [Function], details: [Function] } } },
  static:
   { disclaimer:
      { title: 'Disclaimer',
        description: 'Lorem ipsum dolor sit amet' },
     privacy: { title: 'Privacy', description: 'Lorem ipsum dolor sit amet' } },
  transformation:
   { product:
      { transformProductList: [Function],
        transformProductDetails: [Function] },
     recipe:
      { transformRecipeList: [Function],
        transformRecipeDetails: [Function] },
     store:
      { transformStoreList: [Function],
        transformStoreDetails: [Function] } },
  service:
   { product: { search: [Function], details: [Function] },
     recipe: { search: [Function], details: [Function] },
     store: { search: [Function], details: [Function] } } }
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

You can see a full-fledged example, which includes circular dependencies, in the [example](example) folder.

### lmao([target,] descriptor)

Loads modules into an object as defined by `descriptor`, optionally merging them into the existing `target` object.

**Arguments**

* `target` - Optional object where the modules will be loaded into. Existing properties will be overwritten.
* `descriptor` - An object that describes what modules will be loaded, and in what path they'll be placed.
  * The _keys_ of the descriptor are object paths in dot notation, like those of [keypather](http://npmjs.com/package/keypather).   
  * The _values_ of the descriptor are [glob](https://www.npmjs.com/package/glob) paths
    * If you want to have more control over the destination, you can wrap the values in an object with properties `_root` and `_children`. Root modules will not use the file name as property name; children will. 

**Example**

Builds an object loaded with modules in a specific structure. 

```javascript
lmao(api, {
    _root: 'example/util.js', // Root level modules
    client: 'example/client/*.js',
    'client.sap': {
        _root: 'example/client/sap/index.js', // Root level modules (client.sap.*)
        _children: 'example/client/sap/modules/*.js' // Children modules (client.sap.<filename>.*)
    },
    'client.netsuite': {
        _root: 'example/client/netsuite/index.js',
        _children: 'example/client/netsuite/modules/*.js'
    },
    static: 'example/public/**/*.json',
    transformation: 'example/transformation/*.js',
    service: 'example/service/*.js'
});
```


## Development

* Linting: `gulp lint`
* Testing and coverage: `gulp test`
* Generate JSDoc files: `gulp jsdoc`

## License

[MIT](LICENSE)

## Ayy?

Lmao