// 多个异步请求，如何同时获取最终结果
const fs = require('fs');

let school = {};

// let index = 0;
// let cb = () => {
//   if (++index === 2) {
//     console.log(school);
//   }
// };

function after(times, callback) {
  return function () {
    if (--times === 0) {
      callback();
    }
  }
}

let cb = after(2, () => {
  console.log('school');
  console.log(school);
})

fs.readFile('./name.txt', 'utf8', (err, data) => {
  school.name = data;
  cb();
});

fs.readFile('./age.txt', 'utf8', (err, data) => {
  school.age = data;
  cb();
});


