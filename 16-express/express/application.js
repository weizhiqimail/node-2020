const http = require('http');
const url = require('url');
const Router = require('./router');

// 每次创建一个应用，都是一个全新的路由系统
function Application() {
  this._router = new Router();
}

Application.prototype.get = function (path, ...handlers) {
  this._router.get(path, handlers);
}

Application.prototype.listen = function () {
  const server = http.createServer((req, res) => {
    function done() {
      res.end(`Cannot ${req.method} ${req.url}`);
    }
    this._router.handle(req, res, done);
  });
  server.listen(...arguments);
}

module.exports = Application;
