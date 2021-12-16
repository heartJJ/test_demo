var xml2js = require('xml2js');
var xml = '<xml><appid><![CDATA[wx2421b1c4370ec43b]]></appid><attach><![CDATA[支付测试]]></attach><bank_type><![CDATA[CFT]]></bank_type><fee_type><![CDATA[CNY]]></fee_type></xml>';


const parser = async () => {
  const parser = new xml2js.Parser({trim:true, explicitArray:false, explicitRoot:false});
  const data = await parser.parseStringPromise(xml);

  console.log(data);
};

parser();