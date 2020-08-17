const fs = require('fs');

function mkdirSync(paths) {
  let arr = paths.split('/');
  for (let i = 0; i < arr.length; i++) {
    let currentPath = arr.slice(0, i + 1).join('/');
    if (!fs.existsSync(currentPath)) {
      fs.mkdirSync(currentPath);
    }
  }
}

mkdirSync('a/b/c/')

function mkdirAsync(paths, cb) {
  let arr = paths.split('/');
  let index = 0;

  function next() {
    if (arr.length === index) {
      cb();
      return;
    }
    let currentPath = arr.slice(0, ++index).join('/');
    fs.access(currentPath, err => {
      if (err) {
        fs.mkdir(currentPath, next);
      } else {
        next();
      }
    });
  }

  next();

}

// mkdirAsync('a/b/c/d', () => {
//   console.log('创建完成');
// });

// 需要使用  const fs = require('fs').promises
async function mkdirAsyncAwait(paths) {
  let arr = paths.split('/');
  for (let i = 0; i < arr.length; i++) {
    let currentPath = arr.slice(0, i + 1).join('/');
    try {
      await fs.access(currentPath);
    } catch (err) {
      await fs.mkdir(currentPath);
    }
  }
}

// mkdirAsyncAwait('a/b/c/d/e')
