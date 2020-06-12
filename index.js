'use strict';

function assign(obj, props) {
    let key;
    let definition;

    for (key in props) {
        definition = Object.getOwnPropertyDescriptor(obj, key);

        if (definition && !definition.writable) {
            throw new TypeError(`Cannot assign to read only property '${key}' of object '${obj}'`);
        }

        obj[key] = props[key];
    }

    return obj;
}

function createError(err, code, props) {
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
        props.message = err.message;
        props.stack = err.stack;

        const ErrClass = function () {};

        ErrClass.prototype = Object.create(Object.getPrototypeOf(err));

        const newErr = new ErrClass();

        for (const key in props) {
            Object.defineProperty(newErr, key, {
                value: props[key],
            });
        }

        return newErr;
    }
}

module.exports = createError;
