const path = require('path');
const fs = require('fs').promises;
const mime = require('mime');

module.exports = function (root) {
  return async (ctx, next) => {
    let filePath = path.join(root, ctx.path);
    try {
      let statObj = await fs.stat(filePath);

      if (statObj.isFile()) {
        ctx.type = mime.getType(filePath) + ';charset=utf-8';
        ctx.body = await fs.readFile(filePath);
      } else {
        await next();
      }

    } catch (err) {
      await next();
    }

  }
}
