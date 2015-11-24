'use strict';

var expect = require('chai').expect;

var lmao = require('../index');

var descriptor = {
    _: 'example/util.js', // Root level modules
    client: 'example/client/*.js',
    'client.provider': 'example/client/provider/intershop.js',
    'static': 'example/public/**/*.json',
    transformation: 'example/transformation/*.js'
};

function testApiProperties(api) {
    expect(api.util).to.have.keys('log');
    expect(api.util.log).to.be.a('function');
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

describe('lmao', function () {
    it('Loads modules into a new object', function (done) {
        var api = lmao(descriptor);
        expect(api).to.be.an('object');
        expect(api).to.have.keys('client', 'static', 'transformation', 'util');
        testApiProperties(api);
        done();
    });

    it('Loads modules into an existing object', function (done) {
        var api = {
            version: '0.1.0'
        };
        lmao(api, descriptor);
        expect(api).to.be.an('object').and.to.have.keys('util', 'version', 'client', 'static', 'transformation');
        expect(api.version).to.be.eql('0.1.0');
        testApiProperties(api);
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
