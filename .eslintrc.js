module.exports = {
   "env": {
    "browser": false,
    "es6": true,
    "node": true,
    "mocha": true
  },
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-unused-vars": [1, {"vars": "all", "args": "none"}],
    "comma-dangle": [ 0 ]
  },
  "parser": "babel-eslint"
};