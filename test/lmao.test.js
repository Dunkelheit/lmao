'use strict';

var expect = require('chai').expect;

var lmao = require('../lib/lmao');

var tree = {
    client: {
        _: 'example/client/*.js',
        provider: 'example/client/provider/*.js'
    },
    static: 'example/public/**/*.json',
    service: 'example/service/*.js',
    transformation: 'example/transformation/*.js'
};

function testApiProperties(api) {
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

describe('lmao', function () {

    describe('Asynchronous loading', function () {

        it('Loads modules into a new object', function (done) {
            lmao.load(tree, function (err, api) {
                expect(err).to.not.exist;
                expect(api).to.be.an('object');
                expect(api).to.have.keys('client', 'static', 'service', 'transformation');
                testApiProperties(api);
                done();
            });
        });

        it('Loads modules into an existing object', function (done) {
            var api = {
                version: '0.1.0',
                log: console.log
            };
            lmao.load(api, tree, function (err, api) {
                expect(err).to.not.exist;
                expect(api).to.be.an('object');
                expect(api).to.have.keys('log', 'version', 'client', 'static', 'service', 'transformation');
                expect(api.version).to.be.eql('0.1.0');
                expect(api.log).to.be.a('function');
                testApiProperties(api);
                done();
            });
        });

    });

    describe('Synchronous loading', function () {

        it('Loads modules into a new object', function (done) {
            var api = lmao.loadSync(tree);
            expect(api).to.be.an('object');
            expect(api).to.have.keys('client', 'static', 'service', 'transformation');
            testApiProperties(api);
            done();
        });

        it('Loads modules into an existing object', function (done) {
            var api = {
                version: '0.1.0',
                log: console.log
            };
            lmao.loadSync(api, tree);
            expect(api).to.be.an('object');
            expect(api).to.have.keys('log', 'version', 'client', 'static', 'service', 'transformation');
            expect(api.version).to.be.eql('0.1.0');
            expect(api.log).to.be.a('function');
            testApiProperties(api);
            done();
        });
    });
});
