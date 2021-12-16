'use strict';

const RongSDK = require('rongcloud-sdk')({
  appkey: '8luwapkvucoil',
  secret: 'y0icysjl4h3LWz'
});

const Message = RongSDK.Message;
const History = Message.History;


const t = async () => {
  const result = await History.get({
    date: '2021062108'
  });

  console.log(result);
};

t();