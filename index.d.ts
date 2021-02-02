interface Err<Code> extends Error {
  code: Code
}

interface CreateError {
  <Code extends string|number, Ext extends Object> (
    error:Error,
    code: Code,
    ext: Ext
  ): Err<Code> & Ext
  <Code extends string|number> (error:Error, code:Code): Err<Code>
  <Ext extends Object> (error:Error, ext:Ext): Err<undefined> & Ext
}

declare var createError:CreateError
export = createError
