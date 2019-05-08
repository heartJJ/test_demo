const crypto = require('crypto');
const base64Key = 'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAIolMvoad+rMjIsRN6K1LMEyREmBXTj0z2q9FdGy9p4kYKS66wE+AkpKkCK3MYJ57Lp0gLFh7Wz+0vFfB1P4PqxZRCCG9/yzcfDgliDTFCWJqLjXMZ6hLXQnOwEKJGHuHaI3q52hVPK31OKR9eWQjeodypY4sSTt9EuPaazOqkPDAgMBAAECgYBBdODTquj5I1TQrCbNfMUpAbVjkt1mGHGTZObKxt6eDiSQyVSC8SvKocvr9xuJdFYb/wnfgsQqKhAveFSTkAO5mMQymSWDsdb7+ZjK+4jHObyAWkL8RGMQPX5+bLl2ov967EhSKNibo/TKKGSvLrBeN8xnHmpqrCG4irbTpcqCEQJBANRwoBpo/wK5X+VkOtGRYnXndOflmcVpYuSjknVeCr1Fyz5BrTyPv+CiI8PylM6qKFRkGf9lIWF0jrjUVqIlM4kCQQCmeLUy+TdBSjSxhT1/F9kTehYRN9VYa5RoqhSayzW1Tme5ToQVPh38qdyMJzaUZzU1jEBmGTa7KjNusJaUNg3rAkBgdhtcopxYYk/22wISMo+gtc5RleGyz92Fr/hKrr71noFg7XV58FPR7g2LZdTH2l+hoipj20nC9KfxqQkFaxrxAkAy9GeiPp4nIeuXGs2EBWywhYITqx9mfSdkEgtUhjbeVC1zjxDm36iWGfgj/iy6qAylY1Si67zQ9U3g57RvkUwZAkAP0Zs7X4XEjwKxKjUGrTEoqrdpPpEuhOQD2kylgxwJdPFm6xIEY3lqlz8aK6wIE015c3Uvu2EnZqw+RGnHTW3Y';
// const decodeKey = Buffer.from(base64Key, 'base64').toString()
// console.log(decodeKey)
// console.log(crypto.getHashes())
const sign = crypto.createSign('RSA-SHA1');
sign.update('appId=MDMUD174&bizContent=g7nV6Wjk8KEhzgjtctNM4eCIzM0mjAojQSNF/NZZpVwegpCBGdvcuCHOCO1y00zh4IjMzSaMCiMvN00W1xFHJ2iVBzTso01b&format=JSON&serialNo=D17420190327212906dC5qdKga&signType=RSA&timestamp=1553655442687&version=1.0');

const privateKey = '-----BEGIN PRIVATE KEY-----\n' + 
base64Key + 
                    '\n-----END PRIVATE KEY-----';
console.log(sign.sign(privateKey, 'base64'));