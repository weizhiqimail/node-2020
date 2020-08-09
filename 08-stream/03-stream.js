const path = require('path');
const fs = require('fs');
const ReadStream = require('./04-readStream');

function streamCopy(sourcePath, targetPath, cb) {
  console.time('streamCopy');
  // fs.createReadStream

  let readStream = new ReadStream(sourcePath, {
    flags: 'r',
    encoding: null,
    mode: 0o666,
    autoClose: true,
    start: 2, // [2, 8] °üº¬ 2 ºÍ 8
    end: 8,
    highWaterMark: 3
  });
  let bufferArr = [];

  readStream.on('open', fd => {
    console.log('open', fd);
  });

  readStream.on('close', () => {
    console.log('close');
  })

  readStream.on('data', data => {
    readStream.pause();
    setTimeout(() => {
      readStream.resume();
    }, 1000);
    console.log(data.toString());
    bufferArr.push(data);
  });

  readStream.on('end', () => {
    console.log('end');
    console.log(Buffer.concat(bufferArr).toString());
  });

  readStream.on('error', err => {
    console.log(err);
  });

  let writeStream = fs.createWriteStream(targetPath);
  // readStream.pipe(writeStream);
  cb();
  console.timeEnd('streamCopy');
}

streamCopy(
  path.resolve(__dirname, './name.txt'),
  path.resolve(__dirname, './name1.txt'),
  () => {
    console.log('streamCopy finished');
  }
);
