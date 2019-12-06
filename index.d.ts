type Scalar = Exclude<any, object>

declare function createError<E extends Error, C extends Scalar, T extends object>(error: E, code: C, props?: T): E & T & { code: C }
declare function createError<E extends Error, T extends object>(error: E, props?: T): E & T

declare namespace createError {

}

export = createError
