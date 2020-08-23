const proto = {};

function defineGetter(target, key) {
  proto.__defineGetter__(key, function () {
    return this[target][key];
  });
}

function defineSetter(target, key) {
  proto.__defineSetter__(key, function (value) {
    this[target][key] = value;
  });
}


defineGetter('request', 'url');
defineGetter('request', 'path');

module.exports = proto;
