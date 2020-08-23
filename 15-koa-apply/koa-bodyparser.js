const fs = require('fs');
const uuid = require('uuid');
const path = require('path');
const querystring = require('querystring');

module.exports = function ({uploadDir}) {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      let arr = [];
      ctx.req.on('data', chunk => arr.push(chunk));

      ctx.req.on('end', () => {
        if (ctx.get('content-type') === 'application/x-www-form-urlencoded') {
          let result = Buffer.concat(arr).toString();
          ctx.request.body = querystring.parse(result);
        }
        if (ctx.get('content-type').includes('multipart/form-data')) {
          let result = Buffer.concat(arr);
          console.log('result')
          console.log(result)
          let boundary = '--' + ctx.get('Content-Type').split('=')[1];
          console.log('boundary')
          console.log(boundary)
          let lines = result.split(boundary).slice(1, -1);
          console.log(lines);
          let obj = {};
          lines.forEach(line => {
            let [head, body] = line.split('\r\n\r\n');
            head = head.toString();
            let key = head.match(/name="(.+?)"/)[1];
            if (!head.includes('filename')) {
              obj[key] = body.toString().slice(0, 2);
            } else {
              let content = line.split(head.length + 4, -2);
              let filePath = path.join(uploadDir, uuid.v4);
              obj[key] = {
                filePath,
                size: content.length
              };
              fs.writeFileSync(filePath, content);
            }
          });
          ctx.request.body = obj;
        }
      });
      resolve();
    });
    await next();
  };
}

Buffer.prototype.split = function (sep) {
  let sepLen = Buffer.from(sep).length;
  let arr = [];
  let offset = 0;
  let currentIndex = 0

  while ((currentIndex = this.indexOf(sep, 0)) !== -1) {
    arr.push(this.slice(offset, currentIndex));
    offset = currentIndex + sepLen;
  }

  arr.push(this.slice(offset));
  return arr;
}



