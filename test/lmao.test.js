'use strict';

var expect = require('chai').expect;

var lmao = require('../index');

var tree = {
    client: {
        _: 'example/client/*.js',
        provider: 'example/client/provider/*.js'
    },
    static: 'example/public/**/*.json',
    service: 'example/service/*.js',
    transformation: 'example/transformation/*.js'
};

function testTreeApiProperties(api) {
    expect(api.client).to.have.keys('rest', 'soap', 'provider');
    expect(api.client.rest).to.be.a('function');
    expect(api.client.soap).to.be.a('function');
    expect(api.client.provider).to.have.keys('sap');
    expect(api.client.provider.sap).to.be.an('object');
    expect(api.client.provider.sap).to.have.keys('search', 'details');
    expect(api.client.provider.sap.search).to.be.a('function');
    expect(api.client.provider.sap.details).to.be.a('function');
    expect(api.static).to.have.keys('disclaimer', 'privacy');
    expect(api.static.disclaimer).to.be.an('object');
    expect(api.static.privacy).to.be.an('object');
    expect(api.service).to.have.keys('product', 'recipe', 'store');
    expect(api.service.product).to.be.an('object');
    expect(api.service.product).to.have.keys('search', 'details');
    expect(api.service.product.search).to.be.a('function');
    expect(api.service.product.details).to.be.a('function');
    expect(api.service.recipe).to.be.an('object');
    expect(api.service.recipe).to.have.keys('search', 'details');
    expect(api.service.recipe.search).to.be.a('function');
    expect(api.service.recipe.details).to.be.a('function');
    expect(api.service.store).to.be.an('object');
    expect(api.service.store).to.have.keys('search', 'details');
    expect(api.service.store.search).to.be.a('function');
    expect(api.service.store.details).to.be.a('function');
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
    expect(api.product).to.be.an('object');
    expect(api.product).to.have.keys('transformProductList', 'transformProductDetails');
    expect(api.product.transformProductList).to.be.a('function');
    expect(api.product.transformProductDetails).to.be.a('function');
    expect(api.recipe).to.be.an('object');
    expect(api.recipe).to.have.keys('transformRecipeList', 'transformRecipeDetails');
    expect(api.recipe.transformRecipeList).to.be.a('function');
    expect(api.recipe.transformRecipeDetails).to.be.a('function');
    expect(api.store).to.be.an('object');
    expect(api.store).to.have.keys('transformStoreList', 'transformStoreDetails');
    expect(api.store.transformStoreList).to.be.a('function');
    expect(api.store.transformStoreDetails).to.be.a('function');
}

describe('lmao', function () {

    describe('Asynchronous loading', function () {

        it('Loads module tree into a new object', function (done) {
            lmao(tree, function (err, api) {
                expect(err).to.not.exist;
                expect(api).to.be.an('object');
                expect(api).to.have.keys('client', 'static', 'service', 'transformation');
                testTreeApiProperties(api);
                done();
            });
        });

        it('Loads module tree into an existing object', function (done) {
            var api = {
                version: '0.1.0',
                log: console.log
            };
            lmao(api, tree, function (err, api) {
                expect(err).to.not.exist;
                expect(api).to.be.an('object');
                expect(api).to.have.keys('log', 'version', 'client', 'static', 'service', 'transformation');
                expect(api.version).to.be.eql('0.1.0');
                expect(api.log).to.be.a('function');
                testTreeApiProperties(api);
                done();
            });
        });

        it('Loads modules into a new object', function (done) {
            lmao('example/transformation/*.js', function (err, api) {
                expect(api).to.be.an('object');
                expect(api).to.have.keys('product', 'recipe', 'store');
                testSimpleApiProperties(api);
                done();
            });
        });

        it('Loads modules into an existing object', function (done) {
            var api = {
                version: '0.1.0',
                log: console.log
            };
            lmao(api, 'example/transformation/*.js', function (err, api) {
                expect(api).to.be.an('object');
                expect(api).to.have.keys('product', 'recipe', 'store', 'version', 'log');
                expect(api.version).to.be.eql('0.1.0');
                expect(api.log).to.be.a('function');
                testSimpleApiProperties(api);
                done();
            });
        });
    });

    describe('Synchronous loading', function () {

        it('Loads module tree into a new object', function (done) {
            var api = lmao(tree);
            expect(api).to.be.an('object');
            expect(api).to.have.keys('client', 'static', 'service', 'transformation');
            testTreeApiProperties(api);
            done();
        });

        it('Loads module tree into an existing object', function (done) {
            var api = {
                version: '0.1.0',
                log: console.log
            };
            lmao(api, tree);
            expect(api).to.be.an('object');
            expect(api).to.have.keys('log', 'version', 'client', 'static', 'service', 'transformation');
            expect(api.version).to.be.eql('0.1.0');
            expect(api.log).to.be.a('function');
            testTreeApiProperties(api);
            done();
        });

        it('Loads modules into a new object', function (done) {
            var api = lmao('example/transformation/*.js');
            expect(api).to.be.an('object');
            expect(api).to.have.keys('product', 'recipe', 'store');
            testSimpleApiProperties(api);
            done();
        });

        it('Loads modules into an existing object', function (done) {
            var api = {
                version: '0.1.0',
                log: console.log
            };
            lmao(api, 'example/transformation/*.js');
            expect(api).to.be.an('object');
            expect(api).to.have.keys('log', 'version', 'product', 'recipe', 'store');
            expect(api.version).to.be.eql('0.1.0');
            expect(api.log).to.be.a('function');
            testSimpleApiProperties(api);
            done();
        });
    });
});
