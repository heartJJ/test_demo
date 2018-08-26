const fs = require('fs');
const path = require('path');

// console.log(fs.existsSync(path.resolve(__dirname, 'demo02.js')));

// console.log(fs.existsSync(path.resolve(__dirname, 'demo03.js')));

console.log(fs.existsSync('/Volumes/linuxWorkspace/github_project/test_demo/node/fs'));

console.log(fs.existsSync('/Volumes/linuxWorkspace/github_project/test_demo/node/fsa'));

console.log(fs.readdirSync('/Volumes/linuxWorkspace/github_project/test_demo/node/fs') );