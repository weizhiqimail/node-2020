const querystring = require('querystring');

module.exports = function () {
  return async (ctx, next) => {
    await new Promise((resolve, reject) => {
      const arr = [];
      ctx.req.on('data', chunk => arr.push(chunk));
      ctx.req.on('end', function () {
        if (ctx.get('content-type') === 'application/x-www-form-urlencoded') {
          let result = Buffer.concat(arr).toString();
          ctx.request.body = querystring.parse(result);
        }
        resolve();
      })
    });

    await next();
  }
}
