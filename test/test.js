'use strict';

var errcode = require('../index');
var expect = require('expect.js');

describe('errcode', function () {
    describe('string as first argument', function () {
        it('should throw an error', function () {
            expect(function () { errcode('my message'); }).to.throwError(function (err) {
                expect(err).to.be.a(TypeError);
            });
        });
    });

    describe('error as first argument', function () {
        it('should accept an error and do nothing', function () {
            var myErr = new Error('my message');
            var err = errcode(myErr);

            expect(err).to.be(myErr);
            expect(err.hasOwnProperty(err.code)).to.be(false);
        });

        it('should accept an error and add a code', function () {
            var myErr = new Error('my message');
            var err = errcode(myErr, 'ESOME');

            expect(err).to.be(myErr);
            expect(err.code).to.be('ESOME');
        });

        it('should accept an error object and add code & properties', function () {
            var myErr = new Error('my message');
            var err = errcode(myErr, 'ESOME', { foo: 'bar', bar: 'foo' });

            expect(err).to.be.an(Error);
            expect(err.code).to.be('ESOME');
            expect(err.foo).to.be('bar');
            expect(err.bar).to.be('foo');
        });

        it('should create an error object without code but with properties', function () {
            var myErr = new Error('my message');
            var err = errcode(myErr, { foo: 'bar', bar: 'foo' });

            expect(err).to.be.an(Error);
            expect(err.code).to.be(undefined);
            expect(err.foo).to.be('bar');
            expect(err.bar).to.be('foo');
        });

        it('should not attempt to set non-writable field', function () {
            var myErr = new Error('my message');
            var err;

            Object.defineProperty(myErr, 'code', {
                value: 'derp',
                writable: false,
            });
            err = errcode(myErr, 'ERR_WAT');

            expect(err).to.be.an(Error);
            expect(err.code).to.be('derp');
        });

        it('should not add code to frozen object', function () {
            var myErr = new Error('my message');
            var err = errcode(Object.freeze(myErr), 'ERR_WAT');

            expect(err).to.be.an(Error);
            expect(err.code).to.be(undefined);
        });

        it('should not attempt to set on field that throws at assignment time', function () {
            var myErr = new Error('my message');
            var err;

            Object.defineProperty(myErr, 'code', {
                enumerable: true,
                set: () => {
                    throw new Error('Nope!')
                },
                get: () => {
                    return 'derp'
                }
            });
            err = errcode(myErr, 'ERR_WAT');

            expect(err).to.be.an(Error);
            expect(err.code).to.be('derp');
        });
    });

    describe('falsy first arguments', function () {
        it('should not allow passing null as the first argument', function () {
            expect(function () { errcode(null); }).to.throwError(function (err) {
                expect(err).to.be.a(TypeError);
            });
        });

        it('should not allow passing undefined as the first argument', function () {
            expect(function () { errcode(undefined); }).to.throwError(function (err) {
                expect(err).to.be.a(TypeError);
            });
        });
    });
});
