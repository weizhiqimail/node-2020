const fs = require('fs');
const path = require('path');

// 可读流，异步，实现读一点写一点
fs.createReadStream('./name.txt').pipe(fs.createWriteStream('./name.copy.txt'));

