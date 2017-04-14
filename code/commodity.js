const setThirdClass = (second_res) => { 
  return [...third_class].map(val => {
    const commodity_arr = data_arr.filter(row => row[add_key.SJFL] === val[0]);
    return {
      'FLMC': val[0],
      'FJFL': second_res.find(row => row.FLMC === val[1]).GUID,
      'FJFLMC': val[1],
      'YWXID': getBusinessLine(val[0], 'SJFL'),
      'SPPPID': getBrand(val[0], 'SJFL'),
      'JXSID': company.GUID,
      'CJSJ': current_time,
      'SPSPFLB': commodity_arr.map(row => {
        let ucc = row[add_key.UCC] || '';
        if (ucc.length > 0) {
          ucc = ucc.substring(4);
        }
        return {
          'SPFLMC': val[0],
          'CJR': -1,
          'CJSJ': current_time,
          'SPJCXXB': {
            'SPLX': '0',
            'SPBH': row[add_key.SPBH],
            'ZZJGPPID': getBrand(val[0], 'SJFL'),
            'PPMC': row[add_key.PP],
            'SPMS': row[add_key.SPMS],
            'SDPT': row[add_key.SDPT],
            'BW': row[add_key.BW],
            'KS': row[add_key.KS],
            'ZY': row[add_key.ZY],
            'KD': row[add_key.KD],
            'ZJ': row[add_key.ZJ],
            'CD': row[add_key.CD],
            'GD': row[add_key.GD],
            'JD': row[add_key.JD],
            'QT': row[add_key.QT],
            'UCC': ucc,
            'DW': row[add_key.DW],
            'CJR': -1,
            'CJSJ': current_time,
            'SPBZGGB': {
              'SPBH': row[add_key.SPBH],
              'SPPPID': getBrand(val[0], 'SJFL'),
              'UCC': ucc,
              'BZDW': 1,
              'CJR': -1,
              'CJSJ': current_time
            }
          }
        };
      }),
    };
  });

};
