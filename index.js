'use strict';

function createError(msg, code, props) {
    var err = new Error(msg);
    var key;

    if (code != null) {
        err.code = code;
    }

    if (props) {
        for (key in props) {
            err[key] = props[key];
        }
    }

    return err;
}

module.exports = createError;
