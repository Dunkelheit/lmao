# lmao

Load modules in an object.

## Usage

Imagine you have a folder with the following structure.

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

With `lmao` you can load all those JavaScript and JSON files directly into an object with a specific structure:
 
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