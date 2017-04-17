/**
 * Copyright 2016 by FirstGrid
 * Created by thomas on 16/6/7.
 */

const code = Symbol('code');
const msg = Symbol('msg');
const result = Symbol('result');

/**
 * 简单回传信息包装,主要用于自定义返回结果及信息和code,
 * 使用方式如下:
 * let msg = new SimpleMsg({Code:0,Message:'your message',Result:'your result'});
 * 或者
 * let msg = new SimpleMsg();
 * msg.setCode(1);
 * msg.setMsg('success');
 * msg.setResult({name:'mycustomer'});
 * 最后结合在util.wrapHandle中直接return这个msg就可以了。
 */
class SimpleMsg {
  constructor({Code=0, Message='操作成功', Result={}, models = []}={}) {
    const self = this;
    self.setCode(Code);
    self.setMsg(Message);
    self.setResult(Result);
    models.forEach(model => self.addModel(model));
  }

  setCode(Code = 0) {
    this[code] = Code;
  }

  setMsg(Message = '操作成功') {
    this[msg] = Message;
  }

  setResult(Result = {}) {
    this[result] = Result;
    Object.assign(this, Result);
  }

  addModel(model) {
    if(!model || !model.Model){
      return;
    }
    let ret = {};
    ret[model.Model.name] = model;
    this[result] = Object.assign(this[result], ret);
  }

  getCode() {
    return this[code];
  }

  getMsg() {
    return this[msg];
  }

  getResult() {
    return this[result];
  }

  /**
   * 对象类型,通过Object.prototype.toString.call(instance SimpleMsg)返回[object SimpleMsg]
   * @returns {string}
   */
  get [Symbol.toStringTag]() {
    return 'SimpleMsg';
  }
}

module.exports = SimpleMsg;