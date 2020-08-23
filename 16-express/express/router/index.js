const url = require('url');
const Route = require('./route');
const Layer = require('./layer');

function Router() {
  this.stack = [];

}

// 1. 用户调用 get 时，需要保存成一个 layer 放到栈中
// 2. 产生一个 Route 实例和当前的 layer 创造关系
// 3. 要将 route 的 dispatch 方法存到 layer 上
Router.prototype.get = function (path, ...handlers) {
  // this.stack.push({path, method: 'get', handler});

  const route = this.route(path);
  // 让 route 记录传入的 handlers，并且标记这个 handler 是什么方法
  route.get(handlers);
}

Router.prototype.route = function (path) {
  // 产生 route
  const route = new Route();
  // 产生 layer，和 route 进行关联
  const layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route;
  this.stack.push(layer);
  return route;
}


Router.prototype.handle = function (req, res, done) {
  let {pathname} = url.parse(req.url);
  // let requestMethod = req.method.toLowerCase();
  //
  // for (let i = 0; i < this.stack.length; i++) {
  //   let {path, method, handler} = this.stack[i];
  //
  //   if (method === requestMethod && path === pathname) {
  //     return handler(req, res);
  //   }
  // }
  // done();

  let idx = 0;
  let next = () => {
    if (idx > this.stack.length) {
      return done();
    }
    let layer = this.stack[idx++];
    // 查看 layer 上的 path 和 当前请求的路径是否一致
    if (layer.path === pathname) {

    } else {
      next();
    }
  };
  next();

}

module.exports = Router;
