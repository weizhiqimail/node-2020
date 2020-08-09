const path = require('path');
const fs = require('fs');

function copy(sourcePath, targetPath, cb) {
  console.time('copy');
  const SIZE = 1024 * 1024;
  let readOffset = 0;
  let writeOffset = 0;
  let buffer = Buffer.alloc(SIZE);
  fs.open(sourcePath, 'r', (err, rfd) => {
    if (err) {
      return cb(err);
    }
    fs.open(targetPath, 'w', (err, wfd) => {
      if (err) {
        return cb(err);
      }
      next();
      let times = 0;

      function next() {
        fs.read(rfd, buffer, 0, SIZE, readOffset, (err, bytesRead) => {
          if (err) {
            return cb(err);
          }
          readOffset += bytesRead;
          fs.write(wfd, buffer, 0, bytesRead, writeOffset, (err, bytesWrite) => {
            if (err) {
              return cb(err);
            }
            writeOffset += bytesWrite;
            if (bytesWrite === SIZE) {
              times++;
              next();
            } else {
              cb(null);
              console.timeEnd('copy');
            }
          });
        });
      }
    });
  });
}

// copy(
//   path.resolve(__dirname, './name.txt'),
//   path.resolve(__dirname, './name1.txt'),
//   () => {
//     console.log('copy finished');
//   }
// )

// copy(
//   path.resolve(__dirname, 'F:\\program\\assets\\video\\banzezhishu.mp4'),
//   path.resolve(__dirname, 'F:\\program\\assets\\video\\copy.mp4'),
//   () => {
//     console.log('copy finished');
//   }
// );

