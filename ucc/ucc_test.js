const ucc_parse = require('./ucc_saas'),
  _ = require('lodash');


const tm = [
  // ['0106939488327351111510142115090091324'],
  // ['6938250918780', '111401212114A01'],
  // ['0106939263804497', '111611251016002 21197'],
  // ['0103596010469298172512011015MM03553', '11151204'],
  // ['0106943771610006', '111603021718030110160300654'],
  // ['0110705034266671', '10AVDCBP'],
  // ['0106939263804497', '11161125101600221197'],
  // ['0106938695510167', '111602231719030610KMC160203BI 21'],
  // ['010454654014725711150907', '10DH7']


  // ['111401212114A01', '6938250918780'],
  // ['111611251016002 21197', '0106939263804497'],
  // ['11151204', '0103596010469298172512011015MM03553'],
  // ['111603021718030110160300654', '0106943771610006'],
  // ['10AVDCBP', '0110705034266671'],
  // ['11161125101600221197', '0106939263804497'],
  // ['111602231719030610KMC160203BI 21', '0106938695510167'],
  // ['10DH7', '010454654014725711150907']

  // ['0104546540147257', '1115090710DH7']
  ['010111111111111117160826102196579']
];

const parseTM = () => {
  tm.forEach(val => {
    // console.log(ucc_parse(val));
    ucc_parse(val);
  });
  //console.log(ucc_parse(tm[3]));
};

parseTM();