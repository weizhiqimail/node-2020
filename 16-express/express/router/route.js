const Layer = require('./layer');

function Route() {
  this.stack = [];
}

Route.prototype.dispatch = function (req, res, done) {
  let idx = 0;

  const next = () => {
    if (idx > this.stack.length) {
      return done();
    }
    let layer = this.stack[idx++];
    if (layer.method === req.method.toLowerCase()) {
      layer.handler(req, res, next);
    } else {
      next();
    }
  };
  next();
}

Route.prototype.get = function (handlers) {
  handlers.forEach(handler => {
    let layer = new Layer('/');
    layer.method = 'get';
    this.stack.push(layer);
  })

}

module.exports = Route;
