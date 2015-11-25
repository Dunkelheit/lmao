'use strict';

var expect = require('chai').expect;

var lmao = require('../index');

var descriptor = {
    _root: 'test/api/util.js', // Root level modules
    service: {
        _root: 'test/api/service/index.js',
        _children: 'test/api/service/modules/*.js'
    },
    'static': 'test/api/static/*.json',
    wrongDescriptorItem: {}

};

function testApiProperties(api) {
    expect(api.service).to.be.an('object').and.have.keys('connect', 'version', 'posts', 'users');
    expect(api.service.connect).to.be.a('function');
    expect(api.service.version).to.be.a('string').and.eql('1.0.0');
    expect(api.service.posts).to.be.a('object').and.have.keys('create', 'update', 'delete');
    expect(api.service.posts.create).to.be.a('function');
    expect(api.service.posts.update).to.be.a('function');
    expect(api.service.posts.delete).to.be.a('function');
    expect(api.service.users).to.be.a('object').and.have.keys('create', 'findByMail', 'update');
    expect(api.service.users.create).to.be.a('function');
    expect(api.service.users.findByMail).to.be.a('function');
    expect(api.service.users.update).to.be.a('function');
    expect(api.static).to.be.an('object').and.have.keys('disclaimer', 'privacy');
    expect(api.static.disclaimer).to.be.an('object').and.have.keys('title', 'description');
    expect(api.static.privacy).to.be.an('object').and.have.keys('title', 'description');
}

describe('lmao', function () {

    it('Loads modules into a new object', function (done) {
        var api = lmao(descriptor);
        expect(api).to.be.an('object').and.have.keys('service', 'static', 'util');
        testApiProperties(api);
        done();
    });

    it('Loads modules into an existing object', function (done) {
        var api = {
            log: console.log
        };
        lmao(api, descriptor);
        expect(api).to.be.an('object').and.have.keys('service', 'static', 'util', 'log');
        testApiProperties(api);
        done();
    });

    it('Does not crash due to unsatisfied circular references', function (done) {
        var api = require('../example/api');
        var result = api.service.product.search();
        expect(result).to.be.an('array').and.have.length(1);
        expect(result[0]).to.be.an('object').and.to.have.keys('id', 'name');
        expect(result[0]).to.have.property('id', 1);
        expect(result[0]).to.have.property('name', 'Apples');
        done();
    });

});
