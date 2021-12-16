const download = require('download-git-repo');

download('github:heartJJ/koa_demo', './kk', function (err) {
  console.log(err ? 'Error' : 'Success');

  console.log(err);
});