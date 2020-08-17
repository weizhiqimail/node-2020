const EventEmitter = require('events');
const path = require('path');
const fs = require('fs');

let ws = fs.createWriteStream(path.resolve(__dirname, './name.txt'), {
  highWaterMark: 3
});

let index = 0;

function write() {
  // 标识是否可以写入
  let flag = true;
  while (flag && index < 10) {
    flag = ws.write(index + '');
    index++;
  }
  if (index === 10) {
    ws.end('!!');
  }
}

write();

ws.on('drain', () => {
  write();
});
