'use strict';

function maybeDefineProperty(obj, name, value) {
    var descriptor;

    if (Object.isFrozen(obj)) {
        return;
    }

    descriptor = Object.getOwnPropertyDescriptor(obj, name);

    if (descriptor && !descriptor.writable) {
        return;
    }

    obj[name] = value;
}

function createError(err, code, props) {
    var key;

    if (!(err instanceof Error)) {
        throw new TypeError('Please pass an Error to err-code');
    }

    if (typeof code === 'object') {
        props = code;
    } else if (code != null) {
        maybeDefineProperty(err, 'code', code);
    }

    if (props) {
        for (key in props) {
            maybeDefineProperty(err, key, props[key]);
        }
    }

    return err;
}

module.exports = createError;
