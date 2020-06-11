'use strict';

function assign(obj, props) {
    var key;
    var definition;

    for (key in props) {
        definition = Object.getOwnPropertyDescriptor(obj, key);

        if (definition && !definition.writable) {
            throw new TypeError("Cannot assign to read only property '" + key + "' of object '" + obj + "'");
        }

        obj[key] = props[key];
    }

    return obj;
}

function createError(err, code, props) {
    var newErr;

    if (!(err instanceof Error)) {
        throw new TypeError('Please pass an Error to err-code');
    }

    if (!props) {
        props = {};
    }

    if (typeof code === 'object') {
        props = code;
        code = undefined;
    }

    if (code) {
        props.code = code;
    }

    try {
        return assign(err, props);
    } catch (_) {
        props.cause = err;
        newErr = new Error(err.message);
        newErr.stack = err.stack;

        return assign(newErr, props);
    }
}

module.exports = createError;
