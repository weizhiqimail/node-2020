const path = require('path');
const fs = require('fs');

/*
* ws.write 写入的内容
* ws.end 可以关闭文件
* ws.on('drain', () => {})
* ws.open()
* ws.close()
* */

let ws = fs.createWriteStream(path.resolve(__dirname, './name.txt'), {
  flags: 'w',
  encoding: 'utf8',
  mode: 0o666,
  autoClose: true,
  start: 0,
  // 不会影响内容的写入，预期占用的内存，不是每次写入的量
  // 超过预期后，返回的是 false
  highWaterMark: 3
});

// 内部维护一个变量，这个变量会统计写入的个数，当写入的量达到 highWaterMark 时返回 false，内容写入后，会在统计数量的基础上减少

let flag = ws.write('h');

flag = ws.write('e');
// flag = ws.write('l');

// drain 触发的条件是比如触发预期或超过预期，内存中的内容全部清空后会触发 drain 事件。
ws.on('drain', () => {
  console.log('write drain');
});

// ws.end('l', () => {
//   console.log('write finish 3');
// });

