'use strict';

function createError(err, code, props) {
    var key;

    if (!(err instanceof Error)) {
        throw new TypeError('Please pass an Error to err-code');
    }

    if (typeof code === 'object') {
        props = code;
    } else if (code != null) {
        try {
            err.code = code
        } catch (err) { }
    }

    if (props) {
        for (key in props) {
            try {
                err[key] = props[key]
            } catch (err) { }
        }
    }

    return err;
}

module.exports = createError;
