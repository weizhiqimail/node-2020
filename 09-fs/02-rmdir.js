const fs = require('fs');
const path = require('path');

// 1. 删除文件 fs.unlink， fs.unlinkSync
// 2. 删除文件夹 fs.rmdir， fs.rmdirSync
// 3. 判断是文件还是文件夹 fs.statSync，isFile，isDirectory

function rmdirSync(dir) {
  let has = fs.existsSync(dir);
  if (!has) {
    return;
  }

  let stat = fs.statSync(dir);
  if (stat.isFile()) {
    fs.unlinkSync(dir);
    return;
  }

  let dirs = fs.readdirSync(dir);
  dirs.forEach(d => rmdirSync(path.join(dir, d)));
  fs.rmdirSync(dir);
}

// rmdirSync('./a');

function rmdirAsync(dir, cb) {
  fs.stat(dir, (err, statObj) => {
    if (statObj.isDirectory()) {
      fs.readdir(dir, (err, dirs) => {
        if (err) {
          return cb(err);
        }
        dirs = dirs.map(d => path.join(dir, d));

        let index = 0;

        function next() {
          if (index === dirs.length) {
            return fs.rmdir(dir, cb);
          }
          let current = dirs[index++];
          rmdirAsync(current, next);
        }

        next();


      });
    } else {
      fs.unlink(dir, cb);
    }
  });
}

rmdirAsync('./a', () => {
  console.log('async delete dir success');
});
