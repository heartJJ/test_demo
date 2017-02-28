var rr=`<td width="78%" bgcolor="#FFFFFF">宁波东方恒晟生物科技有限公司</td><td bgcolor="#FFFFFF">宁波市江东区中兴路717号（18-3）；宁波市江东区百宁街77-79号208室</td>
<td bgcolor="#FFFFFF">宁波市江东区中兴路717号（18-3）</td><td bgcolor="#FFFFFF">顾浩路</td>`;
var brr=/<td .* bgcolor="#FFFFFF">(.*?)<\/td>/g;
let ret;
while ((ret = brr.exec(rr)) != null) {
  console.log(ret[1]);
}