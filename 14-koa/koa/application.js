const EventEmitter = require('events');
const http = require('http');
const Stream = require('stream');
const context = require('./context');
const request = require('./request');
const response = require('./response');


class Application extends EventEmitter {
  constructor() {
    super();
    // 防止多个实例共享 context, request, response
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
    this.middlewares = [];  // 所有的中间件函数
  }

  use(callback) {
    this.middlewares.push(callback);
  }

  async handleRequest(req, res) {
    let ctx = this.createContext(req, res);
    await this.compose(ctx);
    let body = ctx.body;
    if (typeof body === 'string' || Buffer.isBuffer(body)) {
      res.end(body);
    } else if (body instanceof Stream) {
      res.setHeader('Content-Disposition', 'attach;filename=111');
      body.pipe(res);
    } else if (typeof body === 'object') {
      res.end(JSON.stringify(body));
    }
  }

  async compose(ctx) {
    const dispatch = i => {
      if (i === this.middlewares.length) {
        return Promise.resolve();
      }
      let middleware = this.middlewares[i];
      return Promise.resolve(middleware(ctx, () => dispatch(i + 1)));
    };

    return dispatch(0);
  }

  createContext(req, res) {
    // 每次请求都创建全新的上下文
    const context = Object.create(this.context);
    const request = Object.create(this.request);
    const response = Object.create(this.response);
    context.request = request;
    context.request.req = context.req = req;
    context.response = response;
    context.response.res = context.res = res;
    return context;
  }

  listen(...args) {
    this.server = http.createServer(this.handleRequest.bind(this));
    this.server.listen(...args);

  }

}

module.exports = Application;
