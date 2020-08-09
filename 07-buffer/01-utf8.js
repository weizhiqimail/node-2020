const fs = require('fs');
const iconv = require('iconv-lite');


let r = fs.readFileSync('./name.txt');
r = iconv.decode(r, 'gbk');
console.log(r);

