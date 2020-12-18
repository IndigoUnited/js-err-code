export type Scalar = number | string | boolean | bigint | null | undefined;
export interface Err<Code extends Scalar, Ext extends Object> extends Error, Ext {
  code: Code
}

interface CreateError {
  <Code extends Scalar, Ext extends Object> (
    reason:string|Error,
    code:Code,
    ext:Ext
  ):Err<Code, Ext>
  <Code extends Scalar> (reason:string|Error, code:Code):Err<Code, {}>
}

declare var createError:CreateError
export = createError
