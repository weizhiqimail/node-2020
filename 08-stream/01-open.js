// node 里的 js 是单线程的，但是 libuv 内部工作原理是多线程
const fs = require('fs');

const buffer = Buffer.alloc(3).fill(0);

fs.open('./name.txt', 'r', function (err, fd) {
  // fs.read(
  // fd 文件资源句柄
  // buffer 写入的 buffer
  // offset 从第几个位置开始读取
  // length 读取的长度
  // position 文件读取的位置是多少
  // )
  fs.read(fd, buffer, 0, 3, 0, (err, bytesRead) => {
    console.log(bytesRead, buffer);
  });
});




