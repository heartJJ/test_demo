const path = require('path');
require('app-module-path').addPath(path.resolve(__dirname, '../../'));
require('src/relations/index');
const models = require('src/models'),
  co = require('co'),
  debug = require('debug'),
  {ckService} = require('src/service');

const create = () => {
  return models.sequelize.transaction(function(t) {
    return co(function*() {
      const zzjgid = process.argv[process.argv.length -1],
        authority = yield models.ZZJGB.findById(zzjgid);
      yield ckService.getXZQHDZ(authority);
      const data = {
        XZQHID: authority.XZQHID,
        CKMC: authority.JGMC,
        SZDZ: authority.XZQHDZ,
        FJCKID: 0,
        JXSID: zzjgid,
        CJSJ: Date.now()
      };
      yield ckService.createMRCK(data, t);
      console.log('创建完成');
    });
  }).catch(err => {
    debug(err);
    process.exit();
  });
};

create();