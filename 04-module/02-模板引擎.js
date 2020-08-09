// 实现一个自定义的模板引擎

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

// const filePath = path.resolve(__dirname, './template.ejs');
// ejs.renderFile(filePath, {name: 'jack'}, (err, data) => {
//   console.log(data);
// });

function renderFile(filePath, obj = {}, cb) {
  let html = fs.readFileSync(filePath, 'utf8');
  html = html.replace(/\{\{([^}]+)\}\}/gi, function () {
    let value = obj[arguments[1].trim()];
    return `${` + value + `}`;
  });
  let head = `let str = '';\r\nwith(obj){\r\n`;
  head += 'str +=`';
  html = html.replace(/\{\%([^%]+)\%\}/gi, function () {
    return '`\r\n' + arguments[1] + '`\r\nstr += \r\n';
  });
  let tail = '`}\r\nreturn str;';
  let r = head + html + tail;
  let fn = new Function('obj', r);
  cb(null, fn(obj));
}

renderFile('./template.html', {name: 'jack', age: 18, users: [1,2,3]}, (err, data) => {
  // console.log(data);
});
