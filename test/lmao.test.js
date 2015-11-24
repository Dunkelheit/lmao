'use strict';

var expect = require('chai').expect;

var lmao = require('../index');

var tree = {
    client: {
        _: 'example/client/*.js',
        provider: 'example/client/provider/intershop.js'
    },
    static: 'example/public/**/*.json',
    transformation: 'example/transformation/*.js'
};

function testTreeApiProperties(api) {
    expect(api.client).to.have.keys('rest', 'soap', 'provider');
    expect(api.client.rest).to.be.a('function');
    expect(api.client.soap).to.be.a('function');
    expect(api.client.provider).to.have.keys('intershop');
    expect(api.client.provider.intershop).to.be.an('object');
    expect(api.client.provider.intershop).to.have.keys('search', 'details');
    expect(api.client.provider.intershop.search).to.be.a('function');
    expect(api.client.provider.intershop.details).to.be.a('function');
    expect(api.static).to.have.keys('disclaimer', 'privacy');
    expect(api.static.disclaimer).to.be.an('object');
    expect(api.static.privacy).to.be.an('object');
    expect(api.transformation).to.have.keys('product', 'recipe', 'store');
    expect(api.transformation.product).to.be.an('object');
    expect(api.transformation.product).to.have.keys('transformProductList', 'transformProductDetails');
    expect(api.transformation.product.transformProductList).to.be.a('function');
    expect(api.transformation.product.transformProductDetails).to.be.a('function');
    expect(api.transformation.recipe).to.be.an('object');
    expect(api.transformation.recipe).to.have.keys('transformRecipeList', 'transformRecipeDetails');
    expect(api.transformation.recipe.transformRecipeList).to.be.a('function');
    expect(api.transformation.recipe.transformRecipeDetails).to.be.a('function');
    expect(api.transformation.store).to.be.an('object');
    expect(api.transformation.store).to.have.keys('transformStoreList', 'transformStoreDetails');
    expect(api.transformation.store.transformStoreList).to.be.a('function');
    expect(api.transformation.store.transformStoreDetails).to.be.a('function');
}

function testSimpleApiProperties(api) {
    expect(api.product).to.be.an('object').and.to.have.keys('transformProductList', 'transformProductDetails');
    expect(api.product.transformProductList).to.be.a('function');
    expect(api.product.transformProductDetails).to.be.a('function');
    expect(api.recipe).to.be.an('object').and.to.have.keys('transformRecipeList', 'transformRecipeDetails');
    expect(api.recipe.transformRecipeList).to.be.a('function');
    expect(api.recipe.transformRecipeDetails).to.be.a('function');
    expect(api.store).to.be.an('object').and.to.have.keys('transformStoreList', 'transformStoreDetails');
    expect(api.store.transformStoreList).to.be.a('function');
    expect(api.store.transformStoreDetails).to.be.a('function');
}

describe('lmao', function () {
    it('Loads module tree into a new object', function (done) {
        var api = lmao(tree);
        expect(api).to.be.an('object');
        expect(api).to.have.keys('client', 'static', 'transformation');
        testTreeApiProperties(api);
        done();
    });

    it('Loads module tree into an existing object', function (done) {
        var api = {
            version: '0.1.0',
            log: console.log
        };
        lmao(api, tree);
        expect(api).to.be.an('object').and.to.have.keys('log', 'version', 'client', 'static', 'transformation');
        expect(api.version).to.be.eql('0.1.0');
        expect(api.log).to.be.a('function');
        testTreeApiProperties(api);
        done();
    });

    it('Loads modules into a new object', function (done) {
        var api = lmao('example/transformation/*.js');
        expect(api).to.be.an('object').and.to.have.keys('product', 'recipe', 'store');
        testSimpleApiProperties(api);
        done();
    });

    it('Loads modules into an existing object', function (done) {
        var api = {
            version: '0.1.0',
            log: console.log
        };
        lmao(api, 'example/transformation/*.js');
        expect(api).to.be.an('object').and.to.have.keys('log', 'version', 'product', 'recipe', 'store');
        expect(api.version).to.be.eql('0.1.0');
        expect(api.log).to.be.a('function');
        testSimpleApiProperties(api);
        done();
    });

    it('Does not crash due to unsatisfied circular references', function (done) {
        var api = require('../example/api');
        var result = api.service.product.search();
        expect(result).to.be.an('array').and.have.length(1);
        expect(result[0]).to.be.an('object').and.to.have.keys('id', 'name');
        expect(result[0]).to.have.property('id', 1);
        expect(result[0]).to.have.property('name', 'A search result');
        done();
    })
});
