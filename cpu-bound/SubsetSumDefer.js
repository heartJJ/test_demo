/**
 * 异步的形式改写 subsetSum
 */
'use strict';

const EventEmitter = require('events').EventEmitter;

class SubsetSumDefer extends EventEmitter {
  /**
   * 构造函数，创建SubsetSum时调用
   * @param  {Number} sum 一个整数，期望的求和的整数
   * @param  {Array}  set 一个集合，被求解的集合
   */
  constructor(sum, set) {
    super();
    this.sum = sum;
    this.set = set;
    this.totalSubsets = 0;
  }

  /**
   * 递归地生成每一个可能的子集，而不把CPU控制权交还给事件循环。大量消耗CPU资源
   * @param  {Array} set    主集合
   * @param  {Array} subset 子集
   */
  _combine(set, subset) {
    for(let i = 0; i < set.length; i++) {
      let newSubset = subset.concat(set[i]);
      // this._combine(set.slice(i + 1), newSubset);
      this._combineInterleaved(set.slice(i + 1), newSubset); // 每次递归均异步执行
      this._processSubset(newSubset);
    }
  }

  /**
   * 核对子集是否符合要求，一旦匹配到，则发出match事件
   * @param  {Array} subset 子集
   */
  _processSubset(subset) {
    console.log('Subset', ++this.totalSubsets, subset);
    const res = subset.reduce((prev, item) => (prev + item), 0);
    if(res == this.sum) {
      this.emit('match', subset);
    }
  }


  _combineInterleaved(set, subset) {
    this.runningCombine++;
    setImmediate(() => {  // 异步执行
      this._combine(set, subset);
      if(--this.runningCombine === 0) {
        this.emit('end'); // 所有异步操作完成，触发 end 事件
      }
    });
  }

  /**
   * 开始进行匹配，匹配完毕之后，发出end事件
   */
  start() {
    // this._combine(this.set, []);
    // this.emit('end');
    this.runningCombine = 0;
    this._combineInterleaved(this.set, []); // end 事件已经移交内部触发
  }
}

module.exports = SubsetSumDefer;