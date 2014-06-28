'use strict';

var errcode = require('../index');
var expect = require('expect.js');

describe('errcode', function () {
    it('should create an error object without code', function () {
        var err = errcode('my message');

        expect(err).to.be.an(Error);
        expect(err.hasOwnProperty(err.code)).to.be(false);
    });

    it('should create an error object with code', function () {
        var err = errcode('my message', 'ESOME');

        expect(err).to.be.an(Error);
        expect(err.code).to.be('ESOME');
    });

    it('should create an error object with code and properties', function () {
        var err = errcode('my message', 'ESOME', { foo: 'bar', bar: 'foo' });

        expect(err).to.be.an(Error);
        expect(err.code).to.be('ESOME');
        expect(err.foo).to.be('bar');
        expect(err.bar).to.be('foo');
    });
});
