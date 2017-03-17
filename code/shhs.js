/**
 * 以回收的部分，匹配物权和相应库位
 * @param mx  当前操作明细
 * @param mxOfRecycle  待生成回收单的明细中以使用部分
 * @param ckList 出库商品
 * @param wqjxsid 物权经销商ID，由传入的值决定
 */
service.giveOwnerAndKW = (mx, mxOfRecycle, ckList, wqjxsid) => {
  const res = ckList.filter(ck => mx.SPPHID === ck.SPPHID && ck.WQJXSID === wqjxsid);
  res.some(val => {
    if(val.SL >= mx.SL){
      mx.KWID = val.KWID;
      mx.WQJXSID = val.WQJXSID;
      return true;
    } else {
      mxOfRecycle.push(Object.assign({}, val, {ZT: mx.ZT}));
      mx.SL -= val.SL;
      return false;
    }
  });
  return mx;
};



/**
 * 处理入参明细部分的已使用部分
 * @param ddid 订单ID
 * @param crkmx 提交的出入库明细
 * @param myJXSID  我的JXSID
 * @param otherJXSID  其他经销商ID
 */
service.handleSYMX = co.wrap(function*(crkmx, ckList, jxsid) {
  const mxOfUse = crkmx.filter(mx => mx.ZT === '3');
  mxOfUse.forEach(mx => {
    const ckOfOtherOwner = ckList.filter(val => val.SPPHID === mx.SPPHID && val.WQJXSID !== jxsid),
      otherOwnerWithOrder = _.orderBy(ckOfOtherOwner, ['SL'], ['desc']),
      ckOfMyself = ckList.filter(val => val.SPPHID === mx.SPPHID && val.WQJXSID === jxsid),
      ckWithOrder = ckOfMyself.concat(otherOwnerWithOrder);
    
  });
  // mxOfUse.forEach(mx => {
  //   const res = crkmx.filter(row => row.ZT === '2' && row.SPPHID === mx.SPPHID && row.WQJXSID === myJXSID),
  //     sum = res.reduce( (preV, curV) => preV + curV.SL, 0);
  //   service.getOwnerOfSp(mxOfUse, mx, myJXSID, otherJXSID, ckList, sum);
  // });
  return mxOfUse;
});

/**
 * 确定本次回收，已使用的商品的物权
 * @param mxOfUse 待回收商品中已使用部分
 * @param mx 当前操作的明细
 * @param myJXSID  我的JXSID
 * @param otherJXSID 其他JXSID
 * @param ckList 出库商品
 * @param sum 待回收明细中，已回收，且SPPHID与当前明细相同的部分，数量总和
 */
service.getOwnerOfSp = (mxOfUse, mx, myJXSID, otherJXSID, ckList, sum) => {
  let ck = ckList.find(val => val.SPPHID === mx.SPPHID && val.WQJXSID === myJXSID);
  if(ck) {
    ck.SL -= sum;
    if (ck.SL >= mx.SL) {
      mx.WQJXSID = myJXSID;
    } else {
      delete ck['KWID'];
      mxOfUse.push(Object.assign({}, ck, {ZT: mx.ZT}));
      mx.SL -= ck.SL;
      mx.WQJXSID = otherJXSID;
    }
  } else {
    mx.WQJXSID = otherJXSID;
  }
};

/**
 * 获取出库商品的物权经销商ID
 * @param 订单ID， 经销商ID
 * @return [JXSID, anotherJXSID] 当前经销商ID， 其他物权经销商ID
 */
service.getWqOfCk = co.wrap(function*(ddid, jxsid) {
  const res = yield getAndGroupCRKMX(ddid, '0', ['1'], ['1'], ['WQJXSID'], jxsid);
  if (res.length === 1) {
    return [res[0].WQJXSID, res[0].WQJXSID];
  }
  return res[0].WQJXSID === jxsid ? [res[0].WQJXSID, res[1].WQJXSID] : [res[1].WQJXSID, res[0].WQJXSID];
});