/**
 * PC版的 复核所用接口，目前仅回收复核时调用
 * 由于 PC版 出库复核， 采取循环调用 单个出库单明细 接口的方式，导致该接口
 * 新增了很多不必要的返回字段，getDGSLAndKWLJ 方法太过繁琐， 考虑删除
 * 当前接口 需要改写，或需要将批号详情聚合在物料号之内，待讨论
 */
service.handleHSFH = co.wrap(function*(ddid, crkd, jxsid) {
  const [rkList, ckList, mxList, mxWithGroup ] = yield [
    service.kwspglbService.getAndGroupCRKMX(ddid, '1', ['1', '3'], ['0'], ['SPPHID', 'ZT'], jxsid),
    service.kwspglbService.getAndGroupCRKMX(ddid, '0', ['1'], ['1'], ['SPPHID'], jxsid),
    knex('CRKMXB')
      .select('SPPHID', 'ZT', 'SL')
      .whereIn('CRKID', crkd)
      .groupBy(['CRKID', 'SPPHID', 'ZT']),
    knex('CRKMXB')
      .select('CRKID', 'SPBH', 'SPPH', 'SPID', 'SPPHID')
      .whereIn('CRKID', crkd)
      .groupBy(['CRKID', 'SPPHID'])
  ];
  mxWithGroup.forEach(mx => {
    const ck = ckList.find(val => val.SPPHID === mx.SPPHID),
      rkOfRecycle = rkList.find(val => val.SPPHID === mx.SPPHID && val.ZT === '2'),
      rkOfUse = rkList.find(val => val.SPPHID === mx.SPPHID && val.ZT === '3'),
      recycle = mxList(val => val.SPPHID === mx.SPPHID && val.ZT === '2'),
      use = mxList(val => val.SPPHID === mx.SPPHID && val.ZT === '3');
    mx.SPMS = ck.SPMS;
    mx.CKSL = ck.SL;
    mx.LSHS = rkOfRecycle ? rkOfRecycle.SL: 0;
    mx.LSSY = rkOfUse  ? rkOfUse.SL : 0;
    mx.BCHS = recycle ? recycle.SL : 0;
    mx.BCSY = use ? use.SL : 0;
  });
});
